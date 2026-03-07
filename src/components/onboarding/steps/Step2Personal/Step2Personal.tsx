"use client";
import "react-day-picker/dist/style.css";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { step2Schema, Step2Values } from "../../schemas/schemas";
import { GenderSection } from "./parts/GenderSection";
import { Birthday } from "./parts/Birthday";
import { LocationSection } from "./parts/LocationSection";
import { RelocationSection } from "./parts/RelocationSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { Step2Nvaigation } from "./parts/Navigation";

export function Step2Personal() {
  const { formData, nextStep, prevStep, updatedFields } = useOnboardingStore();

  const methods = useForm<Step2Values>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      gender: formData.onBoarding.gender as Step2Values["gender"],
      dateOfBirth: formData.onBoarding.dateOfBirth || "2000-01-01",
      location: formData.onBoarding.location || "",
      readyToRelocate: formData.onBoarding.readyToRelocate ?? false,
      relocationLocations: formData.onBoarding.relocationLocations ?? [],
      readyForWorkAbroad: formData.onBoarding.readyForWorkAbroad ?? false,
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: Step2Values) => {
    updatedFields("onBoarding", data);
    nextStep();
  };
  return (
    <div
      className="w-full pb-10 min-h-full flex justify-center items-start text-[#2d3540] bg-[#eff2f6]
    max-sm:jutisy-center max-sm:items-center
    "
    >
      <FormProvider {...methods}>
        <FormWrapper
          className="py-6"
          label={`Exectly ${formData.onBoarding.firstName}! Tell us a little about
            yourself.`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <GenderSection />

          <Birthday />
          <LocationSection />
          <RelocationSection />
          <Step2Nvaigation prevStep={prevStep} />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
