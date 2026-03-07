"use client";
import { useEmployerVacancyStore } from "@/src/store/employer/useEmployerVacancyStore";
import { OnboardingProgress } from "../../onboarding/OnboardingProgress";
import { useEffect, useState } from "react";
import { Step1General } from "./steps/step1/Step1General";
import { Step2Company } from "./steps/step2/Step2Company";
import { Step3Conditions } from "./steps/step3/Step3Conditions";
import { VacancyFormValues, vacancySchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVacancyAction,
  CreateVacancyInput,
} from "@/src/actions/employer/vacancies/createVacancy";
import { FormNavigation } from "../../shared/FormNavigation";
import { useRouter } from "next/navigation";
import { updateVacancy } from "@/src/actions/employer/vacancies/updateVacancy";
import { ROUTES } from "@/src/config/router";

interface Props {
  initialData?: any;
}

export function EmployerVacancyForm({ initialData }: Props) {
  const { step, reset, prevStep } = useEmployerVacancyStore();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<VacancyFormValues>({
    mode: "onChange",
    resolver: zodResolver(vacancySchema),
    defaultValues: initialData || {
      negotiable: false,
      currency: "USD",
      salaryPeriod: "month",
    },
  });

  const {
    formState: { isValid, errors },
  } = methods;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: VacancyFormValues) => {
    setIsSubmitting(true);
    setError(false);

    try {
      const formattedData: CreateVacancyInput = {
        ...data,
        salaryFrom:
          data.negotiable || !data.salaryFrom ? null : Number(data.salaryFrom),
        salaryTo:
          data.negotiable || !data.salaryTo ? null : Number(data.salaryTo),
        city: data.city || null,

        level: data.level.join(", "),
        stack: data.stack.join(", "),
        employmentType: data.employmentType.map((t: any) => t.id).join(", "),
      };

      if (initialData?.id) {
        await updateVacancy({
          id: initialData.id,
          ...(formattedData as any),
        });
      } else {
        await createVacancyAction(formattedData as CreateVacancyInput);
      }

      reset();
      router.push(ROUTES.EMPLOYER.ROOT);
    } catch (err) {
      console.error(err);
      setError(true);
      console.log("errors:", errors);
      console.log("isValid:", isValid);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { handleSubmit } = methods;

  if (!mounted)
    return (
      <span className="text-2xl flex justify-center items-center">Loading</span>
    );

  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-full flex justify-center flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <OnboardingProgress currentStep={step} totalSteps={3} />
        {step === 1 && (
          <div className="max-w-[448px] w-full flex justify-center items-center">
            <Step1General className="px-8 py-6" />
          </div>
        )}
        {step === 2 && (
          <div className="max-w-[448px] w-full flex justify-center items-center">
            <Step2Company className="px-8 py-6" />
          </div>
        )}
        {step === 3 && (
          <div className="flex justify-center">
            <Step3Conditions isSubmitting={isSubmitting} error={error} />
          </div>
        )}
      </form>
    </FormProvider>
  );
}
