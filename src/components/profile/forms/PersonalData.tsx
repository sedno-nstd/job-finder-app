"use client";
import { FormProvider, useForm } from "react-hook-form";
import { IdentityFields } from "../../onboarding/steps/Step1Identity/parts/IdentityFields";
import { Birthday } from "../../onboarding/steps/Step2Personal/parts/Birthday";
import { GenderSection } from "../../onboarding/steps/Step2Personal/parts/GenderSection";
import { LocationSection } from "../../onboarding/steps/Step2Personal/parts/LocationSection";
import { RelocationSection } from "../../onboarding/steps/Step2Personal/parts/RelocationSection";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { saveOnboardingData } from "@/src/actions/onboarding";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFullUserData } from "@/src/actions/getFullUserData";
import { UploadAvatar } from "../parts/UploadAvatar";

export function PersonalData() {
  const { formData, updatedFields } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const onBoarding = formData?.onBoarding;

  const methods = useForm({
    defaultValues: {
      role: onBoarding?.role || "",
      firstName: onBoarding?.firstName || "",
      lastName: onBoarding?.lastName || "",
      gender: onBoarding?.gender || "",
      dateOfBirth: onBoarding?.dateOfBirth || "",
      location: onBoarding?.location || "",
      readyToRelocate: onBoarding?.readyToRelocate || false,
      relocationLocations: onBoarding?.relocationLocations || [],
      readyForWorkAbroad: onBoarding?.readyForWorkAbroad || false,
      desiredJob: onBoarding?.desiredJob || [],
      employmentType: onBoarding?.employmentType || [],
      lastWorkplace: onBoarding?.lastWorkplace || "",
      previousPosition: onBoarding?.previousPosition || "",
      experienceDuration: onBoarding?.experienceDuration || "",
      searchMode: onBoarding?.searchMode || "",
      resumeUrl: onBoarding?.resume?.url || null,
      continueWithoutResume: onBoarding?.continueWithoutResume || false,
    },
  });

  useEffect(() => {
    async function initData() {
      const result = await getFullUserData();

      if (result.success && result.data) {
        updatedFields("onBoarding", result.data);

        methods.reset(result.data);
      }
      setIsLoading(false);
    }
    initData();
  }, [updatedFields, methods]);

  const onSubmit = async (data: any) => {
    const finalData = {
      onBoarding: data,
      userProfile: formData.userProfile,
    };

    try {
      const result = saveOnboardingData(finalData);
      if ((await result).success) {
        router.push("profile");
      } else {
        console.log("result.error");
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center text-main">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className=" bg-white p-6 rounded-xl shadow-sm max-w-[448px] w-full"
        >
          <h1 className="text-3xl font-bold mb-2">Personal data</h1>
          <UploadAvatar />
          <IdentityFields />
          <GenderSection />
          <Birthday />
          <LocationSection />
          <RelocationSection />

          <button
            type="submit"
            className="w-full mt-4 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Save changes
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
