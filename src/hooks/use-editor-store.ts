import { create } from "zustand";

export type ShadowType = "none" | "soft" | "medium" | "hard";
export type AspectRatioType = "auto" | "16/9" | "1/1" | "4/3";
export type DockPosition = "left" | "right";

export const shadowPresets: Record<ShadowType, string> = {
  none: "none",
  soft: "0 10px 40px rgba(0, 0, 0, 0.1)",
  medium: "0 20px 60px rgba(0, 0, 0, 0.3)",
  hard: "0 30px 80px rgba(0, 0, 0, 0.5)",
};

interface EditorState {
  imageSrc: string | null;
  background: string;
  padding: number;
  borderRadius: number;
  imageRadius: number;
  shadow: ShadowType;
  aspectRatio: AspectRatioType;
  scale: number;
  width: number;
  dockPosition: DockPosition;

  setImage: (src: string | null) => void;
  setBackground: (background: string) => void;
  setPadding: (padding: number) => void;
  setBorderRadius: (borderRadius: number) => void;
  setImageRadius: (imageRadius: number) => void;
  setShadow: (shadow: ShadowType) => void;
  setAspectRatio: (aspectRatio: AspectRatioType) => void;
  setScale: (scale: number) => void;
  setWidth: (width: number) => void;
  setDockPosition: (position: DockPosition) => void;
  reset: () => void;
}

const initialState = {
  imageSrc: null,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: 40,
  borderRadius: 12,
  imageRadius: 8,
  shadow: "soft" as ShadowType,
  aspectRatio: "16/9" as AspectRatioType,
  scale: 1,
  width: 800,
  dockPosition: "left" as DockPosition,
};  

export const useEditorStore = create<EditorState>((set) => ({
  ...initialState,

  setImage: (src) => set({ imageSrc: src }),
  setBackground: (background) => set({ background }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setImageRadius: (imageRadius) => set({ imageRadius }),
  setShadow: (shadow) => set({ shadow }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setScale: (scale) => set({ scale }),
  setWidth: (width) => set({ width }),
  setDockPosition: (position) => set({ dockPosition: position }),
  reset: () => set(initialState),
}));
