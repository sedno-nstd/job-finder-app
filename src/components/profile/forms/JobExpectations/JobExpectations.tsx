"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import {
  CURRENCY_OPTIONS,
  PERIOD_OPTIONS,
} from "../../constants/jobExpectations";
import { FormField } from "../../../ui/FormField";
import { useState } from "react";
import { SalarySchema, SalaryValues } from "../../schemas/jobExpectations";
import { FormSelect } from "@/src/components/shared/FormField/FormSelect";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { EmploymentTypeGroup } from "@/src/components/shared/FormField/EmploymentTypeGroup";

export function JobExpectations() {
  const { formData, updatedFields } = useOnboardingStore();
  const [openMenu, setOpenMenu] = useState<"currency" | "period" | null>(null);

  const methods = useForm<SalaryValues>({
    mode: "onChange",
    resolver: zodResolver(SalarySchema),
    defaultValues: {
      currency: formData.userProfile.salaryCurrency || "USD",
      amount: formData.userProfile.salaryAmount || "",
      period: formData.userProfile.salaryPeriod || "month",
      employmentTypes: formData.onBoarding.employmentType || [],
    },
  });

  const { handleSubmit, register } = methods;

  const onSubmit = async (values: SalaryValues) => {
    try {
      updatedFields("userProfile", {
        salaryAmount: values.amount,
        salaryCurrency: values.currency,
        salaryPeriod: values.period,
      });
      const dataToSend = {
        ...formData,
        userProfile: {
          ...formData.userProfile,
          salaryAmount: values.amount,
          salaryCurrency: values.currency,
          salaryPeriod: values.period,
        },
        onBoarding: {
          ...formData.onBoarding,
          employmentType: values.employmentTypes,
        },
      };

      const result = await saveOnboardingData(dataToSend);

      if (!result.success) throw new Error("Error to confirm");
    } catch (err) {
      console.log("Failed to save:", err);
    }
  };
  return (
    <div className="w-full h-full text-main flex items-center justify-center">
      <FormProvider {...methods}>
        <FormWrapper
          className="py-6"
          onSubmit={handleSubmit(onSubmit)}
          label="Desired salary and employment type"
        >
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
            <div className="flex flex-row justify-between gap-3 mb-5">
              <FormSelect
                name="currency"
                data={CURRENCY_OPTIONS}
                label="USD"
                isOpen={openMenu === "currency"}
                setIsOpen={() =>
                  setOpenMenu(openMenu === "currency" ? null : "currency")
                }
              />
              <FormSelect
                name="period"
                data={PERIOD_OPTIONS}
                label="Per month"
                isOpen={openMenu === "period"}
                setIsOpen={() =>
                  setOpenMenu(openMenu === "period" ? null : "period")
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2">Desired employment type</span>
          </div>
          <EmploymentTypeGroup name="employmentTypes" variant="list" />
          <button
            type="submit"
            className="flex-1 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-medium"
          >
            Save
          </button>
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
