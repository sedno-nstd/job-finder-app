import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  theme: "dark" | "white";
  onToggle: () => void;
}

export const useChangeTheme = create<Theme>()(
  persist(
    (set) => ({
      theme: "white",
      onToggle: () =>
        set((state) => ({
          ...state,
          variant: state.theme === "white" ? "white" : "dark",
        })),
    }),
    {
      name: "theme-storage",
    },
  ),
);
