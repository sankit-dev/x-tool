import type { LucideIcon } from "lucide-react";
import { GlassSlider } from "@/components/glass";

interface ControlSliderProps {
  icon: LucideIcon;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

export function ControlSlider({
  icon: Icon,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: ControlSliderProps) {
  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <Icon className="w-4 h-4 text-white/50 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/80">{label}</span>
          <span className="text-xs text-white/50 font-mono tabular-nums">
            {value}
          </span>
        </div>
        <GlassSlider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
    </div>
  );
}
