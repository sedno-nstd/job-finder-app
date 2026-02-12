import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vacancy } from "../config/types";

interface Vacancies {
  vacancies: Vacancy[];
  setVacancies: (data: Vacancy[]) => void;
}

export const useRecommendationStore = create<Vacancies>()(
  persist(
    (set) => ({
      vacancies: [],
      setVacancies: (newVacancies) => set({ vacancies: newVacancies }),
    }),
    {
      name: "recommendation-storage",
    },
  ),
);
