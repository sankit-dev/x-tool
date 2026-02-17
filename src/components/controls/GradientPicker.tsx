import { motion } from "framer-motion";
import { gradients } from "@/lib/gradients";
import { useEditorStore } from "@/hooks/use-editor-store";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function GradientPicker() {
  const { background, setBackground } = useEditorStore();

  return (
    <div className="w-full">
      <p className="text-xs font-medium text-white/60 mb-2 px-1">Background</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar p-1">
        {gradients.map((gradient) => {
          const isActive = background === gradient.css;
          return (
            <motion.button
              key={gradient.id}
              onClick={() => setBackground(gradient.css)}
              className={cn(
                "relative shrink-0 w-11 h-11 rounded-xl overflow-hidden",
                "border border-white/[0.15]",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              )}
              style={{ background: gradient.css }}
              title={gradient.name}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              animate={
                isActive
                  ? {
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 2px rgba(255,255,255,0.5), inset 0 0 16px rgba(255,255,255,0.15)",
                      scale: 1.05,
                    }
                  : {}
              }
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Check className="w-5 h-5 text-white drop-shadow-md" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
