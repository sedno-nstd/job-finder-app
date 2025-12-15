import { create } from "zustand";
import { Vacancy } from "../search/domain/vacancy/types";
import { persist } from "zustand/middleware";

interface VacancyState {
  favoriteVacancies: Vacancy[];
  addFavoritesVacancy: (vacancy: any) => void;
  deleteFavoriteVacancy: (id: string) => void;
}

const useAuthVacancy = create<VacancyState>()(
  persist(
    (set, get) => ({
      favoriteVacancies: [],
      addFavoritesVacancy: (vacancy) =>
        set((state) => ({
          ...state,
          favoriteVacancies: [...state.favoriteVacancies, vacancy],
        })),
      deleteFavoriteVacancy: (id) =>
        set((state) => ({
          ...state,
          favoriteVacancies: state.favoriteVacancies.filter(
            (item) => item.id !== id
          ),
        })),
    }),
    {
      name: "favorite-vacancies",
    }
  )
);
