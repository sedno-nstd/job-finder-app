"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { step3Schema, Step3Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobSelectionList } from "./parts/JobSelectionList";
import { useJobSelection } from "./hooks/useJobSelection";
import { SelectedJobList } from "./parts/SelectedJobList";
import { useStickyObserver } from "./hooks/useStickyObserver";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { HeaderSection } from "./parts/HeaderSection";

export function Step3JobPreferences() {
  const { formData, nextStep, updatedFields, prevStep } = useOnboardingStore();

  const methods = useForm<Step3Values>({
    mode: "onChange",
    resolver: zodResolver(step3Schema),
    defaultValues: {
      desiredJob: formData.onBoarding.desiredJob ?? [],
    },
  });

  const onSubmit = (data: Step3Values) => {
    updatedFields("onBoarding", data);
    nextStep();
  };

  return (
    <div className="flex-1 max-w-[448px]  flex items-center justify-center text-main">
      <FormProvider {...methods}>
        <Step3Content onSubmit={onSubmit} prevStep={prevStep} />
      </FormProvider>
    </div>
  );
}

function Step3Content({
  onSubmit,
  prevStep,
}: {
  onSubmit: (data: Step3Values) => void;
  prevStep: () => void;
}) {
  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    watch,
  } = useFormContext<Step3Values>();

  const initialData = watch("desiredJob") || [];
  const { joobs, query, selectProfession, setQuery } =
    useJobSelection(initialData);
  const hasError = !!errors.desiredJob || !isValid;

  const { isSticky, sentinelRef } = useStickyObserver({ joobs });

  return (
    <FormWrapper
      onSubmit={handleSubmit(onSubmit)}
      className="pb-6 mb-6"
      as="form"
    >
      <HeaderSection />

      <SelectedJobList
        joobs={joobs}
        selectProfession={selectProfession}
        sentinelRef={sentinelRef}
      />
      {joobs.length === 0 && <div ref={sentinelRef} className="h-px w-full" />}

      <JobSelectionList name="desiredJob" />

      <FormNavigation
        isError={hasError}
        variant="registration"
        isSubmitting={isSubmitting}
        onBack={prevStep}
      />
    </FormWrapper>
  );
}
