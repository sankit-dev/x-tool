import type { LucideIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
      <Icon className="w-4 h-4 text-neutral-400 shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-300">{label}</span>
          <span className="text-xs text-neutral-500 font-mono">{value}</span>
        </div>
        <Slider
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
