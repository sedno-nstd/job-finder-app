import { create } from "zustand";
import { OnboardingData } from "../actions/onboarding";
import { createJSONStorage, persist } from "zustand/middleware";

const initialFormData: OnboardingData = {
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
  resumeUrl: null,
  continueWithoutResume: false,
};
interface OnboardingState {
  step: number;
  formData: OnboardingData;
  nextStep: () => void;
  prevStep: () => void;
  updatedFields: (fields: Partial<OnboardingData>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      formData: initialFormData,
      updatedFields: (fields) =>
        set((state) => ({
          formData: { ...state.formData, ...fields },
        })),

      nextStep: () =>
        set((state) => ({
          step: state.step + 1,
        })),

      prevStep: () =>
        set((state) => ({
          step: state.step - 1,
        })),
      reset: () => set({ step: 1, formData: initialFormData }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
