import {
  CURRENCY_OPTIONS,
  PERIOD_OPTIONS,
} from "@/src/components/profile/constants/jobExpectations";
import { FormSelect } from "@/src/components/shared/FormField/FormSelect";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function CurrencyPeriod() {
  const [isOpen, setIsOpen] = useState<"currency" | "salaryPeriod" | null>(
    null,
  );
  const {
    formState: { errors },
    watch,
    getValues,
  } = useFormContext();

  const selectedCurrency = watch("currency");
  const selectedPeriod = watch("salaryPeriod");

  const config = [
    {
      name: "currency",
      data: CURRENCY_OPTIONS,
      currentLabel:
        CURRENCY_OPTIONS.find((opt) => opt.value === selectedCurrency)?.label ||
        "USD",
    },
    {
      name: "salaryPeriod",
      data: PERIOD_OPTIONS,
      currentLabel:
        PERIOD_OPTIONS.find((opt) => opt.value === selectedPeriod)?.label ||
        "Per month",
    },
  ] as const;

  return (
    <div className="flex flex-row justify-between gap-3 mb-5">
      {config.map((item) => {
        console.log(getValues(item.name));
        return (
          <div className="flex flex-col w-full" key={item.name}>
            <FormSelect
              name={item.name}
              data={item.data}
              label={item.currentLabel}
              isOpen={isOpen === item.name}
              setIsOpen={() => {
                setIsOpen(isOpen === item.name ? null : item.name);
              }}
            />
            {errors[item.name] && (
              <span className="text-sm text-red-500 font-medium">
                {String(errors[item.name]?.message)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
