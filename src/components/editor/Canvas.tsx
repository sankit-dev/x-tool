import { forwardRef } from "react";
import { useEditorStore } from "@/hooks/use-editor-store";
import { ImageContainer } from "./ImageContainer";

export const Canvas = forwardRef<HTMLDivElement>((_props, ref) => {
  const { background, padding, borderRadius, aspectRatio, width } =
    useEditorStore();

  const aspectRatioValue = {
    auto: "auto",
    "16/9": "16 / 9",
    "1/1": "1 / 1",
    "4/3": "4 / 3",
  }[aspectRatio];

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center transition-all duration-300"
      style={{
        background,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        aspectRatio: aspectRatioValue,
        width: `${width}px`,
        maxHeight: "70vh",
      }}
    >
      <ImageContainer />
    </div>
  );
});

Canvas.displayName = "Canvas";
