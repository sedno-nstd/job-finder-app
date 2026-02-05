"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { step3Schema, Step3Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormNavigation } from "./parts/FormNavigation";
import { JobSelectionList } from "./parts/JobSelectionList";
import { StickySearchBar } from "./parts/StickySearchBar";
import { useJobSelection } from "./hooks/useJobSelection";
import { SelectedJobList } from "./parts/SelectedJobList";
import { useStickyObserver } from "./hooks/useStickyObserver";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex-1 flex items-center justify-center text-main">
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
  onSubmit: any;
  prevStep: any;
}) {
  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = useFormContext();

  const initialData = watch("desiredJob") || [];
  const { joobs, query, selectProfession, setQuery } =
    useJobSelection(initialData);

  const { isSticky, sentinelRef, setIsSticky } = useStickyObserver({ joobs });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [0],
        rootMargin: "0px 0px 0px 0px",
      },
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [joobs]);

  return (
    <form
      className="flex flex-col relative bg-[#ffff] shadow-sm 
      lg:rounded-lg lg:max-w-[456px]
      md:max-w-[600px]
      max-sm:rounded-none 
      "
      onSubmit={handleSubmit(onSubmit)}
    >
      <button
        type="button"
        className="
            absolute cursor-pointer text-blue-600 top-4 left-2
            max-sm:top-6 sm:top-6
            md:hidden
            "
        onClick={() => prevStep()}
      >
        <span className="flex flex-row">
          <ArrowLeft />
          Back
        </span>
      </button>
      <div
        className="flex flex-col pt-8 px-6 shrink-0 gap-3 mb-2
      max-sm:mt-6 sm:mt-5
      "
      >
        <label className="text-2xl font-bold cursor-text md:text-3xl">
          What job are you looking for?
        </label>
        <span className="text-[17px]">Up to 20 keywords</span>
      </div>

      <SelectedJobList
        joobs={joobs}
        selectProfession={selectProfession}
        sentinelRef={sentinelRef}
      />
      {joobs.length === 0 && <div ref={sentinelRef} className="h-px w-full" />}

      <StickySearchBar isSticky={isSticky} query={query} setQuery={setQuery} />
      <JobSelectionList
        joobs={joobs}
        query={query}
        selectProfession={selectProfession}
      />

      <FormNavigation isValid={isValid} data={joobs} prevStep={prevStep} />
    </form>
  );
}
