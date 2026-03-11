"use client";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { Step6SearchMode } from "@/src/components/onboarding/steps/Step6SearchMode";
import { ROUTES } from "@/src/config/router";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchType() {
  const { formData } = useOnboardingStore();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const { onBoarding } = formData;
    const { searchMode, ...otherFields } = onBoarding;
    try {
      const res = await saveOnboardingData({
        userProfile: formData.userProfile,
        onBoarding: {
          ...otherFields,
          searchMode: searchMode,
        },
      });
      if (!res) console.log("Error to change data");
      setSuccess(true);

      router.push(ROUTES.PROFILE.ROOT);
    } catch (err) {
      setSuccess(false);
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full bg-white flex justify-center items-center flex-col pb-5">
      <Step6SearchMode />
      <button
        onClick={() => onSubmit()}
        disabled={success}
        className="w-full max-w-[400px] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-all font-semibold"
      >
        {success ? "Complete" : "Save"}
      </button>
    </div>
  );
}
