"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const springKnob = { stiffness: 400, damping: 30 };
const springFill = { stiffness: 300, damping: 30 };

function GlassSlider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );
  const percent = ((values[0] ?? min) - min) / (max - min || 1);

  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, springKnob);

  return (
    <SliderPrimitive.Root
      data-slot="glass-slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {/* Glass track */}
      <SliderPrimitive.Track
        data-slot="glass-slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full",
          "h-2 w-full",
          "bg-white/[0.06] border border-white/[0.08]",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
        )}
      >
        {/* Liquid fill - animated with spring */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-white/20"
          style={{
            width: "var(--glass-slider-fill, 0%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          initial={false}
          animate={{ width: `${percent * 100}%` }}
          transition={springFill}
        />
        <SliderPrimitive.Range className="absolute h-full rounded-full [&]:hidden" />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-slot="glass-slider-thumb"
          asChild
        >
          <motion.span
            className={cn(
              "block size-5 shrink-0 rounded-full touch-none",
              "border border-white/30 bg-white/15",
              "shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.4)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              "disabled:pointer-events-none",
            )}
            style={{ scale: scaleSpring }}
            onPointerDown={() => scale.set(0.92)}
            onPointerUp={() => scale.set(1)}
            onPointerLeave={() => scale.set(1)}
          />
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

GlassSlider.displayName = "GlassSlider";

export { GlassSlider };
