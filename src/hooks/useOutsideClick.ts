import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(handler: () => void) {
  const currentElement = useRef<T | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        !currentElement.current ||
        currentElement.current.contains(e.target as Node)
      ) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);
  return currentElement;
}
