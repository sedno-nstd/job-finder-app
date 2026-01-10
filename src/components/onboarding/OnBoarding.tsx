import { saveOnboardingData } from "@/src/actions/onboarding";
import { Step2Personal } from "./steps/Step2Personal/Step2Personal";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { Step3JobPreferences } from "./steps/Step3JobPreferences/Step3JobPreferences";
import { Step4Experience } from "./steps/Step4Experience";
import { Step5SelectMode } from "./steps/Step5SelectMode";
import { useRouter } from "next/navigation";
import { Step1Identity } from "./steps/Step1Identity/Step1Identity";
import { Step6SearchMode } from "./steps/Step6SearchMode";
import { OnboardingProgress } from "./OnboardingProgress";

export function OnBoarding() {
  const { formData, step } = useOnboardingStore();
  const router = useRouter();

  const handleFinish = async () => {
    const result = await saveOnboardingData({
      ...formData,
      role: "applicant",
    });

    if (result.success) {
      router.push("/vacancies");
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="flex-1 flex bg-[#eff2f6] ">
      {step === 1 && <Step1Identity />}
      {step === 2 && <Step2Personal />}
      {step === 3 && <Step3JobPreferences />}
      {step === 4 && <Step4Experience />}
      {step === 5 && <Step5SelectMode />}
      {step === 6 && <Step6SearchMode />}
    </div>
  );
}
