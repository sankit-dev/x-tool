import { useRef, useState } from "react";
import { useEditorStore } from "@/hooks/use-editor-store";
import { usePaste } from "@/hooks/use-paste";
import { Canvas } from "./Canvas";
import { DropZone } from "./DropZone";
import { FloatingDock } from "../controls/FloatingDock";
import { useImageExport } from "@/hooks/use-image-export";

export function EditorStage() {
  const imageSrc = useEditorStore((state) => state.imageSrc);
  const dockPosition = useEditorStore((state) => state.dockPosition);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { exportToClipboard, isExporting } = useImageExport();

  const handleExport = async () => {
    const success = await exportToClipboard(canvasRef.current);
    if (success) {
      // Flash green animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  usePaste();

  if (!imageSrc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <DropZone />
      </div>
    );
  }

  // Flex layout based on dock position (left or right)
  const containerClass =
    dockPosition === "left"
      ? "flex flex-row min-h-screen"
      : "flex flex-row-reverse min-h-screen";

  return (
    <div className={containerClass}>
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={isAnimating ? "animate-flash-green" : ""}>
          <Canvas ref={canvasRef} />
        </div>
      </div>

      {/* Dock */}
      <FloatingDock onExport={handleExport} isExporting={isExporting} />
    </div>
  );
}
