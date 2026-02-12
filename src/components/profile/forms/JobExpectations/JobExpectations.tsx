"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { saveOnboardingData } from "@/src/actions/onboarding";
import { EMPLOYMENT_TYPES } from "../../../onboarding/constants/jobOptions";
import {
  CURRENCY_OPTIONS,
  PERIOD_OPTIONS,
} from "../../constants/jobExpectations";
import { FormField } from "../../../ui/formInput";
import { CustomSelect } from "../../../ui/CustomSelect";
import { useState } from "react";

const SalarySchema = z
  .object({
    amount: z.string(),
    currency: z.enum(["USD", "UAH", "EUR"]),
    period: z.enum(["Year", "Month", "Hour"]),
    employmentTypes: z.array(z.string()).min(1, "Select at least one type"),
  })
  .superRefine((val, ctx) => {
    if (
      val.currency !== "UAH" &&
      val.period !== "Year" &&
      val.currency.length > 6
    ) {
      ctx.addIssue({
        code: "custom",
        message: "To much salary",
      });
    }
  });

type SalaryValues = z.infer<typeof SalarySchema>;

export function JobExpectations() {
  const { formData, updatedFields } = useOnboardingStore();
  const [typesArray, setTypesArray] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<"currency" | "period" | null>(null);

  const handleSelectType = (id: string) => {
    const nextArray = typesArray.includes(id)
      ? typesArray.filter((item) => item !== id)
      : [...typesArray, id];

    setTypesArray(nextArray);
    setValue("employmentTypes", nextArray, { shouldValidate: true });
  };

  const methods = useForm<SalaryValues>({
    mode: "onChange",
    resolver: zodResolver(SalarySchema),
    defaultValues: {
      currency: formData.userProfile.salaryCurrency || "USD",
      amount: formData.userProfile.salaryAmount || "",
      period: formData.userProfile.salaryPeriod || "Month",
      employmentTypes: formData.onBoarding.employmentType || typesArray,
    },
  });

  const { handleSubmit, register, setValue, watch } = methods;

  const selectedCurrency = watch("currency");
  const selectedPeriod = watch("period");

  const onSubmit = async (values: any) => {
    try {
      updatedFields("userProfile", {
        salaryAmount: values.amount,
        salaryCurrency: values.currency,
        salaryPeriod: values.period,
      });
      const currentFullData = useOnboardingStore.getState().formData;

      const result = await saveOnboardingData(currentFullData);
    } catch (err) {
      console.log("Failed to save:", err);
    }
  };
  return (
    <div className="w-full h-full text-main flex items-center justify-center">
      <FormProvider {...methods}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white p-6 rounded-xl shadow-sm max-w-[448px] w-full"
        >
          <div className="mb-4">
            <label
              htmlFor=""
              className="text-3xl font-bold max-w-[400px] text-wrap"
            >
              Desired salary and employment type
            </label>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mb-3">
              <span className="font-semibold mb-2">Desired salary</span>
              <FormField
                type="text"
                placeholder="For example, 12000"
                {...register("amount")}
                className="h-[40px] border"
              />
            </div>
            <div className="flex flex-row justify-between mb-5">
              <CustomSelect
                value={selectedCurrency}
                setSelect={(val) => {
                  setValue("currency", (val as "USD") || "UAH" || "EUR", {
                    shouldValidate: true,
                  });
                  setOpenMenu(null);
                }}
                setIsOpen={() =>
                  setOpenMenu(openMenu === "currency" ? null : "currency")
                }
                isOpen={openMenu === "currency"}
                data={CURRENCY_OPTIONS}
                defaultLabel="USD"
                className="pt-2 text-main"
              />
              <CustomSelect
                value={selectedPeriod}
                setSelect={(val) => {
                  setValue("period", val as "Year" | "Month" | "Hour", {
                    shouldValidate: true,
                  });
                  setOpenMenu(null);
                }}
                setIsOpen={() =>
                  setOpenMenu(openMenu === "period" ? null : "period")
                }
                isOpen={openMenu === "period"}
                data={PERIOD_OPTIONS}
                defaultLabel="Per month"
                className="bg-white shadow-2xl w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2">Desired employment type</span>
          </div>
          {EMPLOYMENT_TYPES.map((item) => (
            <div
              className="flex flex-row gap-4 mb-5 w-fit select-none cursor-pointer"
              key={item.id}
              onClick={() => handleSelectType(item.id)}
            >
              <input
                type="checkbox"
                checked={typesArray.includes(item.id)}
                readOnly
                className="w-[22px] h-[22px] cursor-pointer border-secondary accent-blue-600"
              />
              <span>{item.label}</span>
            </div>
          ))}
          <button
            type="submit"
            className="flex-1 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-medium"
          >
            Save
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
