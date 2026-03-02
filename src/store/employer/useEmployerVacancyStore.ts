import { Vacancy } from "@/src/config/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type VacancyFormValues = Partial<
  Omit<Vacancy, "id" | "postedAt" | "employerId">
>;

interface EmployerVacancyState {
  formData: VacancyFormValues;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  updatedFields: (data: VacancyFormValues) => void;
}

export const useEmployerVacancyStore = create<EmployerVacancyState>()(
  persist(
    (set) => ({
      step: 1,
      formData: {
        level: [],
        stack: [],
        currency: "USD",
        salaryPeriod: "month",
      },
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: state.step - 1 })),
      reset: () =>
        set({
          step: 1,
          formData: {
            level: [],
            stack: [],
            currency: "USD",
            salaryPeriod: "month",
          },
        }),
      updatedFields: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
    }),

    {
      name: "employer-vacancy-storage",
    },
  ),
);
