import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchProps {
  searchQuery: string;
  locationQuery: string;
  isSuggestionsOpen: boolean;

  applySearch: boolean;

  setSearchQuery: (value: string) => void;
  setLocationQuery: (value: string) => void;
  setIsSuggestionsOpen: (v: boolean) => void;

  triggerSearch: () => void;
  resetSearchQuery: () => void;
  resetSearchLocation: () => void;

  finalSearch: string;

  focusedField: "search" | "location" | null;
  setFocusedField: (field: "search" | "location" | null) => void;
}

export const useSearchStore = create<SearchProps>()(
  persist(
    (set) => ({
      searchQuery: "",
      locationQuery: "",
      suggestion: false,
      applySearch: false,
      finalSearch: "",
      focusedField: null,
      setSearchQuery: (value) =>
        set((state) => ({
          ...state,
          searchQuery: value,
        })),
      setLocationQuery: (value) =>
        set((state) => ({
          ...state,
          locationQuery: value,
        })),
      setSuggestion: (value) =>
        set({
          suggestion: value,
        }),
      triggerSearch: () =>
        set((state) => ({ applySearch: true, finalSearch: state.searchQuery })),
      resetSearchQuery: () =>
        set({
          searchQuery: "",
          applySearch: false,
        }),
      resetSearchLocation: () =>
        set({
          locationQuery: "",
          applySearch: false,
        }),
      setFocusedField: (field) => set({ focusedField: field }),
    }),
    { name: "search-storage" }
  )
);
