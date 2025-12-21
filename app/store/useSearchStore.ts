import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchProps {
  searchQuery: string;
  locationQuery: string;
  isSearching: boolean;
  setSearchQuery: (value: string) => void;
  setLocationQuery: (value: string) => void;
  triggerSearch: () => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchProps>()(
  persist(
    (set) => ({
      searchQuery: "",
      locationQuery: "",
      isSearching: false,
      setSearchQuery: (value) =>
        set((state) => ({
          ...state,
          searchQuery: value,
          isSearching: false,
        })),
      setLocationQuery: (value) =>
        set((state) => ({
          ...state,
          locationQuery: value,
          isSearching: false,
        })),
      triggerSearch: () => set({ isSearching: true }),
      resetSearch: () =>
        set({
          searchQuery: "",
          locationQuery: "",
          isSearching: false,
        }),
    }),
    { name: "search-storage" }
  )
);
