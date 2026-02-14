import { useEditorStore, shadowPresets } from "@/hooks/use-editor-store";

export function ImageContainer() {
  const { imageSrc, imageRadius, shadow } = useEditorStore();

  if (!imageSrc) return null;

  return (
    <img
      src={imageSrc}
      alt="Uploaded content"
      className="max-w-full max-h-full object-contain"
      style={{
        display: "block",
        borderRadius: `${imageRadius}px`,
        boxShadow: shadowPresets[shadow],
      }}
    />
  );
}
