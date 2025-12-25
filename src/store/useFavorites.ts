import { create } from "zustand";
import { Vacancy } from "../config/types";
import { persist } from "zustand/middleware";

interface VacancyState {
  favoriteVacancies: Vacancy[];
  isFavorite: (id: string) => boolean;
  tooggleFavorites: (vacancy: Vacancy) => void;
}

export const useAuthVacancy = create<VacancyState>()(
  persist(
    (set, get) => ({
      favoriteVacancies: [],

      isFavorite: (id) => get().favoriteVacancies.some((v) => v.id === id),
      tooggleFavorites: (vacancy) => {
        const currentFavorites = get().favoriteVacancies;

        const isAlreadyFav = currentFavorites.some(
          (item) => item.id === vacancy.id
        );

        if (isAlreadyFav) {
          set({
            favoriteVacancies: currentFavorites.filter(
              (item) => item.id !== vacancy.id
            ),
          });
        } else {
          set({
            favoriteVacancies: [...currentFavorites, vacancy],
          });
        }
      },
    }),
    {
      name: "favorite-vacancies",
    }
  )
);
