"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function GlassToggle({
  active = false,
  children,
  className,
  onClick,
  ...buttonProps
}: GlassToggleProps) {
  const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(
    null,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 500);
    onClick?.(e);
  };

  return (
    <motion.span
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <button
        type="button"
        className={cn(
          "relative overflow-hidden rounded-full px-3 py-2 text-xs font-medium w-full",
          "border border-white/[0.12]",
          "bg-white/[0.06] backdrop-blur-md",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
          "transition-[background-color,border-color,box-shadow] duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50",
          "min-w-[4.5rem]",
          "hover:bg-white/[0.1] hover:border-white/[0.18]",
          active &&
            "bg-white/[0.14] border-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.08)]",
          !active && "text-white/85",
          className,
        )}
        onClick={handleClick}
        {...buttonProps}
      >
        {ripple && (
          <motion.span
            className="absolute rounded-full bg-white/25 pointer-events-none"
            initial={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              x: "-50%",
              y: "-50%",
              opacity: 1,
            }}
            animate={{
              width: 120,
              height: 120,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ margin: 0 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    </motion.span>
  );
}
