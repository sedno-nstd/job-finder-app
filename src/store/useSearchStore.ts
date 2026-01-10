import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SalaryPeriod } from "./useFilterStore";

interface SearchProps {
  searchQuery: string;
  locationQuery: string;
  finalSearch: string;

  minSalary: number;
  selectedPeriod: SalaryPeriod;
  locationType: string;
  postingDate: string;
  level: string;
  applySearch: boolean;
  focusedField: "search" | "location" | null;
  geo: "all" | "near";
  showSideBar: boolean;

  setShowSideBar: (s: boolean) => void;

  setSearchQuery: (value: string) => void;
  setLocationQuery: (value: string) => void;
  setFocusedField: (field: "search" | "location" | null) => void;

  triggerSearch: () => void;

  setFilter: (
    key: "locationType" | "postingDate" | "level" | "geo",
    value: string
  ) => void;
  setMinSalary: (val: number) => void;
  setPeriod: (p: SalaryPeriod) => void;

  resetSearchQuery: () => void;
  resetSearchLocation: () => void;
}

export const useSearchStore = create<SearchProps>()(
  persist(
    (set) => ({
      searchQuery: "",
      locationQuery: "",
      applySearch: false,
      finalSearch: "",
      focusedField: null,
      minSalary: 0,
      selectedPeriod: "month",
      locationType: "any",
      level: "any",
      postingDate: "any",
      geo: "all",
      showSideBar: false,

      setPeriod: (period) => set({ selectedPeriod: period }),
      setMinSalary: (value) => set({ minSalary: value }),
      setSearchQuery: (value) => set({ searchQuery: value }),
      setLocationQuery: (value) => set({ locationQuery: value }),
      setFilter: (key, value) =>
        set(() => ({
          [key]: value,
          applySearch: true,
        })),
      setShowSideBar: (value) => set({ showSideBar: value }),

      triggerSearch: () =>
        set((state) => ({ applySearch: true, finalSearch: state.searchQuery })),
      resetSearchQuery: () =>
        set({
          searchQuery: "",
        }),
      resetSearchLocation: () =>
        set({
          locationQuery: "",
        }),
      setFocusedField: (field) => set({ focusedField: field }),
    }),
    { name: "search-storage" }
  )
);
