"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { EXPERIENCE_OPTIONS } from "../../constants/jobOptions";
import { FormProvider, useForm } from "react-hook-form";
import { step4Schema, Step4Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LastWorkPlace } from "./parts/LastWorkPlace";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { ProfessionField } from "./parts/ProfessionField";
import { CustomSelect } from "@/src/components/ui/CustomSelect";

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

  const { handleSubmit, setValue, watch } = methods;

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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const experienceOptions = EXPERIENCE_OPTIONS.map((item) => ({
    id: item.value,
    label: item.label,
    value: item.value,
  }));
  const experienceValue = watch("experienceDuration");

  return (
    <div className="flex-1 flex items-center justify-center text-main">
      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)} onBack={prevStep}>
          <div className="max-sm:mt-2 sm:mt-2">
            <h1 className="text-3xl font-medium mb-5 mt-4">
              Last worked place
            </h1>
          </div>

          <div className="flex flex-col mb-5 w-full">
            <LastWorkPlace />
          </div>

          <div className="mb-6 w-full">
            <ProfessionField name="previousPosition" />
          </div>

          <div className="mb-5 w-full max-sm:mb-8">
            <label
              htmlFor=""
              className="text-sm font-medium mb-2 max-sm:text-base"
            >
              Duration of stay
            </label>
            <CustomSelect
              data={experienceOptions}
              id={experienceValue}
              setSelect={(val) => {
                setValue("experienceDuration", val, { shouldValidate: true });
                setIsSelectOpen(false);
              }}
              isOpen={isSelectOpen}
              setIsOpen={setIsSelectOpen}
              defaultLabel="Select experience"
              position="bottom"
              showArrow={true}
            />
          </div>
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
