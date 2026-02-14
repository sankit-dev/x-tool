import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useEditorStore } from "@/hooks/use-editor-store";

export function DropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const setImage = useEditorStore((state) => state.setImage);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setImage(dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [setImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      className="flex items-center justify-center min-h-[70vh] w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label
        className={`
          relative flex flex-col items-center justify-center
          w-full max-w-2xl h-96 cursor-pointer
          border-2 border-dashed rounded-2xl
          transition-all duration-300
          ${
            isDragging
              ? "border-blue-500 bg-blue-500/10 scale-105"
              : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900/50"
          }
        `}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          {isDragging ? (
            <Upload className="w-16 h-16 text-blue-500 animate-pulse" />
          ) : (
            <ImageIcon className="w-16 h-16 text-neutral-400" />
          )}
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-neutral-200">
              Drop an image here
            </p>
            <p className="text-sm text-neutral-400">
              or click to browse • or press{" "}
              <kbd className="px-2 py-1 text-xs font-semibold bg-neutral-800 border border-neutral-700 rounded">
                Ctrl+V
              </kbd>{" "}
              to paste
            </p>
            <p className="text-xs text-neutral-500">
              Supports PNG, JPG, GIF, WebP
            </p>
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}
