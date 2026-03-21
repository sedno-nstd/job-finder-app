"use client";
import { MultiSelectionGrid } from "@/src/components/shared/FormField/MultiSelectionGrid";
import { SelectedItemsList } from "@/src/components/shared/FormField/SelectedItemsList";
import { useMultiSelect } from "@/src/hooks/forms/useMultiSelect";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import clsx from "clsx";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { DesiredJobSchema, DesiredJobValue } from "../../schemas/desired-job";
import { zodResolver } from "@hookform/resolvers/zod";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { useMemo, useState } from "react";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/router";
import { FormField } from "@/src/components/ui/base/FormField";

interface DesiredJobProps {
  className?: string;
}

interface Props {
  className?: string;
}

export function DesiredJob({ className }: DesiredJobProps) {
  const { formData } = useOnboardingStore();
  const methods = useForm<DesiredJobValue>({
    resolver: zodResolver(DesiredJobSchema),
    defaultValues: { desiredJobs: formData.onBoarding.desiredJob || [] },
  });

  return (
    <FormProvider {...methods}>
      <DesiredJobContent className={className} />
    </FormProvider>
  );
}

function DesiredJobContent({ className }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [size, setSize] = useState(10);

  const { formData, updatedFields } = useOnboardingStore();
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<DesiredJobValue>();
  const { selectedItems, handleRemove, handleSelect } = useMultiSelect({
    name: "desiredJobs",
  });

  const desiredJob = watch("desiredJobs");

  const onSubmit = async (values: DesiredJobValue) => {
    try {
      updatedFields("onBoarding", {
        desiredJob: values.desiredJobs,
      });

      const dataToSend = {
        ...formData,
        onBoarding: {
          ...formData.onBoarding,
          desiredJob: values.desiredJobs,
        },
      };

      const res = await saveOnboardingData(dataToSend);
      if (res.success) router.push(ROUTES.PROFILE.ROOT);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const { filteredList, hasMore } = useMemo(() => {
    const allMatches = POPULAR_PROFESSIONS.filter(
      (item) =>
        item.toLowerCase().includes(query.toLowerCase()) &&
        !desiredJob.includes(item),
    );
    const paginated = allMatches.slice(0, size).map((item) => ({
      label: item,
      value: item,
    }));
    return {
      filteredList: paginated,
      hasMore: allMatches.length > size,
    };
  }, [query, size, desiredJob]);

  return (
    <FormWrapper
      as="form"
      label="Job expierence"
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("w-full h-full pt-4 pb-4 mb-4", className)}
    >
      <SelectedItemsList data={selectedItems} onRemove={handleRemove} />

      <FormField
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSize(10);
        }}
        placeholder="Search..."
      />
      {errors.desiredJobs && (
        <span className="text-sm text-red-500 font-medium">
          {errors.desiredJobs.message}
        </span>
      )}
      <MultiSelectionGrid
        className="mb-4 mt-4"
        data={filteredList}
        handleSelect={handleSelect}
        query={query}
        setQuery={setQuery}
      />
      {hasMore && (
        <div className="w-full flex justify-center items-center">
          <button
            type="button"
            className="w-full max-w-[300px] max-h-[28px] rounded-lg bg-gray-200 cursor-pointer mb-4 mt-4 text-zinc-900 font-medium flex items-center justify-center p-2"
            onClick={() => setSize((prev) => prev + 5)}
          >
            More
          </button>
        </div>
      )}
      <FormNavigation variant="update" />
    </FormWrapper>
  );
}
