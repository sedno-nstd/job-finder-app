"use client";
import { createContext, useContext, useState } from "react";
import { SearchFilters } from "@/src/config/types";

interface VacanciesContextType {
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  showSideBar: boolean;
  setShowSideBar: (s: boolean) => void;
}

const VacanciesContext = createContext<VacanciesContextType | undefined>(
  undefined
);

export function VacanciesProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>({
    geo: "all",
    level: "any",
    location: "any",
    postingDate: "any",
    salaryPeriod: "month",
    search: "any",
    stack: [],
  });
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <VacanciesContext.Provider
      value={{ filters, setFilters, showSideBar, setShowSideBar }}
    >
      {children}
    </VacanciesContext.Provider>
  );
}

export const useVacanciesContext = () => {
  const context = useContext(VacanciesContext);
  if (!context)
    throw new Error("useVacanciesContext must be used within Provider");
  return context;
};
