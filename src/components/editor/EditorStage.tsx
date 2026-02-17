import { useRef, useState } from "react";
import { useEditorStore } from "@/hooks/use-editor-store";
import { usePaste } from "@/hooks/use-paste";
import { Canvas } from "./Canvas";
import { DropZone } from "./DropZone";
import { FloatingDock } from "../controls/FloatingDock";
import { useImageExport } from "@/hooks/use-image-export";
import { GlassPanel } from "@/components/glass";

function GlassCanvasWrapper({
  isAnimating,
  canvasRef,
}: {
  isAnimating: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <GlassPanel
      interactive
      parallax={6}
      elevated
      rounded="3xl"
      className={isAnimating ? "animate-flash-green" : ""}
    >
      <Canvas ref={canvasRef} />
    </GlassPanel>
  );
}

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
      {/* Canvas Area - glass panel with parallax & specular */}
      <div className="flex-1 flex items-center justify-center p-8 perspective-[1200px]">
        <GlassCanvasWrapper
          isAnimating={isAnimating}
          canvasRef={canvasRef}
        />
      </div>

      {/* Dock */}
      <FloatingDock onExport={handleExport} isExporting={isExporting} />
    </div>
  );
}
