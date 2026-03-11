"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { step4Schema, Step4Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LastWorkPlace } from "./parts/LastWorkPlace";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { ProfessionField } from "./parts/ProfessionField";
import { WorkExpierence } from "./parts/WorkExpierence";

export function Step4Experience() {
  const { formData, nextStep, updatedFields, prevStep } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const methods = useForm<Step4Values>({
    mode: "onChange",
    resolver: zodResolver(step4Schema),
    defaultValues: {
      experienceDuration: formData.onBoarding.experienceDuration || "",
      previousPosition: formData.onBoarding.previousPosition || "",
      lastWorkplace: formData.onBoarding.lastWorkplace || "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Step4Values) => {
    try {
      updatedFields("onBoarding", data);
      setIsSubmitting(true);
      setError(false);
      nextStep();
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
      setError(true);
    }
  };

  return (
    <div className="h-full flex w-full max-w-[448px]  flex-col items-center justify-center text-main">
      <FormProvider {...methods}>
        <FormWrapper
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          onBack={prevStep}
          className="mb-6 pb-6"
        >
          <h1 className="text-3xl font-medium mb-5 mt-4">Last worked place</h1>

          <LastWorkPlace
            name="lastWorkplace"
            label="Last worked place"
            className="mt-6 mb-6"
          />

          <ProfessionField
            name="previousPosition"
            label="Previous position"
            className="mb-6"
          />

          <WorkExpierence name="experienceDuration" label="Duration of stay" />
          <FormNavigation
            variant="registration"
            isSubmitting={isSubmitting}
            isError={error}
            onBack={prevStep}
          />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
