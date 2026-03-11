"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AboutSchema, AboutValue } from "../../schemas/About";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { MainUserData } from "@/src/types/user";
import { useRouter } from "next/navigation";
import { VoiceTextArea } from "@/src/components/shared/VoiceTextArea";
import { useState } from "react";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { ROUTES } from "@/src/config/router";

export function SkillsOverview() {
  const { formData } = useOnboardingStore();
  const router = useRouter();

  const methods = useForm<AboutValue>({
    mode: "onSubmit",
    resolver: zodResolver(AboutSchema),
    defaultValues: {
      about: formData.userProfile.aboutMe || "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const about = watch("about");

  const onSubmit = async (data: AboutValue) => {
    const currentStore = useOnboardingStore.getState();
    const currentFormData = currentStore.formData;

    try {
      const fullDataToSave: MainUserData = {
        ...currentFormData,
        userProfile: {
          ...currentFormData.userProfile,
          aboutMe: data.about,
        },
      };
      const result = await saveOnboardingData(fullDataToSave);

      if (result.success) {
        router.push(ROUTES.PROFILE.ROOT);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)} as="form">
      <VoiceTextArea
        placeHolderClasses="text-2xl font-medium"
        className="pt-6"
        value={about}
        onChange={(val) => setValue("about", val, { shouldValidate: true })}
        placeholder="Enter text"
        label="Briefly, what should employers know about you and your skills?"
      />
      <FormNavigation variant="update" secondButtonClasses="mt-4 mb-6" />
    </FormWrapper>
  );
}
