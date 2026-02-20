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
    try {
      // Подготавливаем данные: кастуем в any, чтобы TS не ругался на resume
      const dataToSend = {
        ...formData,
        onBoarding: {
          ...formData.onBoarding,
          resume: formData.onBoarding.resume?.url || null, // Передаем только строку
          role: "applicant",
        },
      } as any;

      const result = await saveOnboardingData(dataToSend);

      console.log("Server response:", result);

      if (result && result.success) {
        console.log("Success! Updating session and redirecting...");
        await update();
        router.push("/vacancies");
      } else {
        console.error("Server returned error:", result?.error);
        alert(
          "Ошибка при сохранении: " + (result?.error || "Неизвестная ошибка"),
        );
      }
    } catch (err) {
      console.error("Client-side error:", err);
      alert("Произошла ошибка при отправке данных.");
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
        {step === 6 && (
          <div className="w-full justify-center flex pt-4">
            <button
              onClick={() => handleFinish()}
              type="button"
              className="w-[200px] cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-semibold"
            >
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
