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
import { ArrowLeft } from "lucide-react";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { Step2Nvaigation } from "./parts/Navigation";

export function Step2Personal() {
  const { formData, nextStep, prevStep, updatedFields } = useOnboardingStore();

  const methods = useForm<Step2Values>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      gender: formData.onBoarding.gender || "",
      dateOfBirth: formData.onBoarding.dateOfBirth || "2000-01-01",
      location: formData.onBoarding.location || "",
      readyToRelocate: formData.onBoarding.readyToRelocate || false,
      relocationLocations: [] as string[],
      readyForWorkAbroad: formData.onBoarding.readyForWorkAbroad || false,
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
      className="w-full h-full flex justify-center items-start text-[#2d3540] bg-[#eff2f6]
    max-sm:jutisy-center max-sm:items-center
    "
    >
      <FormProvider {...methods}>
        <FormWrapper
          label={`Exectly ${formData.onBoarding.firstName}! Tell us a little about
            yourself.`}
          className="flex flex-col w-full bg-white relative py-8 px-6
        max-sm:justify-start
        sm:w-full sm:rounded-lg sm:shadow-sm 
        md:max-w-[600px]
        lg:max-w-[600px]
        xl:max-w-[448px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            type="button"
            className="
            absolute cursor-pointer text-blue-600 top-4 left-2
            max-sm:top-10 
            md:hidden
            "
            onClick={() => prevStep()}
          >
            <ArrowLeft>Back</ArrowLeft>
          </button>

          <GenderSection />

          <Birthday />
          <LocationSection />
          <RelocationSection />
          <Step2Nvaigation prevStep={prevStep} isValid={isValid} />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
