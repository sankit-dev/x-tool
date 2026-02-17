"use client";

import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CursorState {
  x: number;
  y: number;
  isInside: boolean;
  /** 0–1 relative to element bounds for specular positioning */
  relX: number;
  relY: number;
}

const defaultCursor: CursorState = {
  x: 0,
  y: 0,
  isInside: false,
  relX: 0.5,
  relY: 0.5,
};

type CursorContextValue = {
  cursor: CursorState;
  setCursor: (state: CursorState) => void;
  /** Call from onMouseMove with element.getBoundingClientRect() for relX/relY */
  updateFromEvent: (e: React.MouseEvent, rect: DOMRect) => void;
  leave: () => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorState>(defaultCursor);
  const rafRef = useRef<number | null>(null);

  const updateFromEvent = useCallback(
    (e: React.MouseEvent, rect: DOMRect) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const relX = rect.width ? (e.clientX - rect.left) / rect.width : 0.5;
        const relY = rect.height ? (e.clientY - rect.top) / rect.height : 0.5;
        setCursor({
          x: e.clientX,
          y: e.clientY,
          isInside: true,
          relX: Math.max(0, Math.min(1, relX)),
          relY: Math.max(0, Math.min(1, relY)),
        });
      });
    },
    [],
  );

  const leave = useCallback(() => {
    setCursor((prev) => (prev.isInside ? { ...prev, isInside: false } : prev));
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursor, setCursor, updateFromEvent, leave }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export { CursorContext };
