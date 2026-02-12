import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MainUserData } from "../types/user";

type FormCategory = keyof MainUserData;

const initialFormData: MainUserData = {
  onBoarding: {
    role: "",
    firstName: "",
    lastName: "",

    gender: "",
    dateOfBirth: "",
    location: "",
    readyToRelocate: false,
    relocationLocations: [],
    readyForWorkAbroad: false,

    desiredJob: [],
    employmentType: [],
    lastWorkplace: "",
    previousPosition: "",
    experienceDuration: "",
    searchMode: "",
    resume: {
      name: "",
      size: "",
      url: "",
    },
    continueWithoutResume: false,
  },
  userProfile: {
    customImage: null,

    salaryAmount: "",
    salaryCurrency: "USD",
    salaryPeriod: "Month",

    aboutMe: "",
    phone: null,
  },
};
interface OnboardingState {
  step: number;
  formData: MainUserData;
  nextStep: () => void;
  prevStep: () => void;
  updatedFields: <T extends FormCategory>(
    category: T,
    fields: Partial<MainUserData[T]>,
  ) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      formData: initialFormData,
      updatedFields: (category, fields) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [category]: {
              ...state.formData?.[category],
              ...fields,
            },
          },
        })),

      nextStep: () =>
        set((state) => ({
          step: state.step + 1,
        })),

      prevStep: () =>
        set((state) => ({
          step: state.step > 0 ? state.step - 1 : 0,
        })),
      reset: () => set({ step: 1, formData: initialFormData }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
