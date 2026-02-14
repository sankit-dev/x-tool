import { useState } from "react";
import { toPng } from "html-to-image";

export function useImageExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportToClipboard = async (element: HTMLElement | null) => {
    if (!element) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2, // Retina quality
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      return true;
    } catch (error) {
      console.error("Export failed:", error);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToClipboard, isExporting };
}
