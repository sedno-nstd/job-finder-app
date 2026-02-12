"use client";
import { saveOnboardingData } from "@/src/actions/onboarding";
import { Step2Personal } from "./steps/Step2Personal/Step2Personal";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { Step3JobPreferences } from "./steps/Step3JobPreferences/Step3JobPreferences";
import { Step4Experience } from "./steps/Step4Experience/Step4Experience";
import { Step5SelectMode } from "./steps/Step5SelectMode";
import { useRouter } from "next/navigation";
import { Step1Identity } from "./steps/Step1Identity/Step1Identity";
import { Step6SearchMode } from "./steps/Step6SearchMode";
import { OnboardingProgress } from "./OnboardingProgress";
import { useSession } from "next-auth/react";

export function OnBoarding() {
  const { update } = useSession();
  const { formData, step } = useOnboardingStore();
  const router = useRouter();

  const handleFinish = async () => {
    const result = await saveOnboardingData({
      ...formData,
      onBoarding: {
        ...formData.onBoarding,
        role: "applicant",
      },
    });

    if (result) {
      await update();
      router.push("/vacancies");
    } else {
      console.error(result);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full overflow-x-hidden">
      <OnboardingProgress step={step} />
      <div className="flex-1">
        {step === 1 && <Step1Identity />}
        {step === 2 && <Step2Personal />}
        {step === 3 && <Step3JobPreferences />}
        {step === 4 && <Step4Experience />}
        {step === 5 && <Step5SelectMode />}
        {step === 6 && <Step6SearchMode />}
      </div>
      {step === 6 && (
        <div className="w-full">
          <button
            onClick={() => handleFinish()}
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-semibold"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
