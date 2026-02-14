import { gradients } from "@/lib/gradients";
import { useEditorStore } from "@/hooks/use-editor-store";
import { Check } from "lucide-react";

export function GradientPicker() {
  const { background, setBackground } = useEditorStore();

  return (
    <div className="w-full">
      <p className="text-xs font-medium text-neutral-400 mb-2 px-1">
        Background
      </p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar p-2">
        {gradients.map((gradient) => {
          const isActive = background === gradient.css;
          return (
            <button
              key={gradient.id}
              onClick={() => setBackground(gradient.css)}
              className={`
                relative shrink-0 w-12 h-12 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-105"
                    : "hover:scale-110 hover:ring-1 hover:ring-white/30"
                }
              `}
              style={{ background: gradient.css }}
              title={gradient.name}
            >
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
