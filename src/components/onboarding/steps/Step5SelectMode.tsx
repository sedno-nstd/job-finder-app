"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useState } from "react";
import { step5Schema, Step5Values } from "../schemas/schemas";
import { FormNavigation } from "../../shared/FormNavigation";
import { EmploymentTypeGroup } from "../../shared/FormField/EmploymentTypeGroup";
import { FormWrapper } from "../../shared/FormWrapper";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  name: string;
}

export function Step5SelectMode({ name }: Props) {
  const { updatedFields, formData, nextStep, prevStep } = useOnboardingStore();
  const [error, setError] = useState(false);
  const methods = useForm<Step5Values>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      employmentType: formData.onBoarding.employmentType || [],
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Step5Values) => {
    try {
      updatedFields("onBoarding", data);
      nextStep();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="w-full h-full flex items-center text-main justify-center">
      <FormProvider {...methods}>
        <FormWrapper
          className="py-8"
          onSubmit={handleSubmit(onSubmit)}
          onBack={prevStep}
          label={`Your wishes regarding ${(<br />)} employment`}
        >
          <label className="text-2xl  font-bold cursor-text pt-3">
            Your wishes regarding <br /> employment
          </label>
          <EmploymentTypeGroup name={name} variant="list" />
          <FormNavigation variant="registration" isError={error} />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
