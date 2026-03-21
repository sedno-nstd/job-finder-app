import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { useEmployerVacancyStore } from "@/src/store/employer/useEmployerVacancyStore";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { SalarySection } from "./parts/SalarySection";
import { CurrencyPeriod } from "./parts/CurrencyPeriod";
import { Description } from "./parts/Description";
import { Negoitable } from "./parts/Negoitable";
import { FormNavigation } from "@/src/components/shared/FormNavigation";

interface Props {
  className?: string;
  isSubmitting?: boolean;
  error?: boolean;
}

export function Step3Conditions({ className, isSubmitting, error }: Props) {
  const { prevStep } = useEmployerVacancyStore();

  const { watch, setValue } = useFormContext();
  const isNegotiable = watch("negotiable");

  useEffect(() => {
    if (isNegotiable) {
      setValue("salaryFrom", "");
      setValue("salaryTo", "");
    }
  }, [isNegotiable]);

  return (
    <FormWrapper
      as="div"
      className={clsx("py-8 max-md:py-8", className)}
      onBack={prevStep}
      label="Compensation & Role"
      id="vacancy-step-3"
    >
      <SalarySection isNegotiable={isNegotiable} />
      <CurrencyPeriod />
      <Negoitable isNegotiable={isNegotiable} />
      <Description name="description" />
      <FormNavigation
        firstButtonClasses=" px-2"
        variant="registration"
        onBack={prevStep}
        isSubmitting={isSubmitting}
        isError={error}
      />
    </FormWrapper>
  );
}
