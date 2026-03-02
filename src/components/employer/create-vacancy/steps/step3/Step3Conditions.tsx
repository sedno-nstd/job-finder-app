import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { useEmployerVacancyStore } from "@/src/store/employer/useEmployerVacancyStore";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { SalarySection } from "./steps/SalarySection";
import { CurrencyPeriod } from "./steps/CurrencyPeriod";
import { Description } from "./steps/Description";
import { Negoitable } from "./steps/Negoitable";

interface Props {
  className?: string;
}

export function Step3Conditions({ className }: Props) {
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
      className={clsx("", className)}
      onBack={prevStep}
      label="Compensation & Role"
      id="vacancy-step-3"
    >
      <SalarySection isNegotiable={isNegotiable} />
      <CurrencyPeriod />
      <Negoitable isNegotiable={isNegotiable} />
      <Description name="description" />
    </FormWrapper>
  );
}
