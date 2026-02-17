"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { use } from "react";
import { CursorContext } from "@/contexts/CursorContext";
import { cn } from "@/lib/utils";

const springSoft = { stiffness: 200, damping: 25, mass: 0.5 };

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Enable cursor-following specular and parallax */
  interactive?: boolean;
  /** Parallax shift factor (e.g. 4 = 4px max shift) */
  parallax?: number;
  /** Elevation for stronger blur/shadow */
  elevated?: boolean;
  /** Extra rounding */
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

export function GlassPanel({
  children,
  className,
  interactive = true,
  parallax = 4,
  elevated = false,
  rounded = "2xl",
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = use(CursorContext);

  const relX = ctx?.cursor.relX ?? 0.5;
  const relY = ctx?.cursor.relY ?? 0.5;

  const tiltX = useSpring(0, springSoft);
  const tiltY = useSpring(0, springSoft);
  const rotateY = useTransform(tiltX, (v) => -v);
  const scale = useSpring(1, springSoft);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !ctx) return;
    const rect = ref.current.getBoundingClientRect();
    ctx.updateFromEvent(e, rect);
    if (interactive && parallax) {
      const rx = rect.width ? (e.clientX - rect.left) / rect.width : 0.5;
      const ry = rect.height ? (e.clientY - rect.top) / rect.height : 0.5;
      tiltX.set((rx - 0.5) * parallax);
      tiltY.set((ry - 0.5) * parallax);
    }
  };

  const handleMouseLeave = () => {
    ctx?.leave();
    if (interactive) {
      tiltX.set(0);
      tiltY.set(0);
      scale.set(1);
    }
  };

  const handleMouseDown = () => {
    if (interactive) scale.set(0.995);
  };

  const handleMouseUp = () => {
    if (interactive) scale.set(1);
  };

  const roundedClass = {
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    "2xl": "rounded-[1.25rem]",
    "3xl": "rounded-[1.5rem]",
  }[rounded];

  return (
    <motion.div
      ref={ref}
      className={cn(
        "glass-panel glass-noise overflow-hidden",
        elevated && "glass-panel-elevated",
        roundedClass,
        interactive && "glass-specular",
        className,
      )}
      style={{
        ...(interactive && {
          ["--glass-specular-x" as string]: `${relX * 100}%`,
          ["--glass-specular-y" as string]: `${relY * 100}%`,
        }),
        ...(interactive && {
          rotateX: tiltY,
          rotateY,
          scale,
        }),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </motion.div>
  );
}
