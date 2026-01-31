"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { saveOnboardingData } from "@/src/actions/onboarding";
import { EMPLOYMENT_TYPES } from "../../onboarding/constants/jobOptions";
import { useEffect, useState } from "react";
import { CURRENCY_OPTIONS, PERIOD_OPTIONS } from "../constants/jobExpectations";
import { CustomSelect } from "../../onboarding/components/CustomSelect";

const SalarySchema = z
  .object({
    currency: z.enum(["USD", "EUR", "UAH"]).default("USD"),
    period: z.enum(["per hour", "per month", "per year"]).default("per month"),
    amount: z.string().min(1).regex(/^\d+$/, "Only int"),
    employmentTypes: z.array(z.string()).min(1, "Select at least one type"),
  })
  .refine(
    (data) => {
      const limit = data.currency === "UAH" ? 6 : 5;
      return data.amount.length <= limit;
    },
    {
      message: "Too many digits for this currency",
      path: ["amount"],
    },
  );

type SalaryValues = z.infer<typeof SalarySchema>;

export function JobExpectations() {
  const { formData, updatedFields } = useOnboardingStore();
  const [typesArray, setTypesArray] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"currency" | "period" | null>(null);

  const toggleOpenSelect = (menu: "currency" | "period") => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMenus = () => setOpenMenu(null);

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
      period: formData.userProfile.salaryPeriod || "per month",
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
              <input
                type="text"
                placeholder="For example, 12000"
                className="border relative border-secondary rounded-md px-3 h-[40px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
                {...register("amount")}
              />
            </div>
            <div className="flex flex-row justify-between mb-5">
              <CustomSelect
                maxWidth="180px"
                label="Currency"
                isOpen={openMenu === "currency"}
                onSelect={(val) => {
                  setValue("currency", val as "USD" | "EUR" | "UAH", {
                    shouldValidate: true,
                  });
                  setOpenMenu(null);
                }}
                options={CURRENCY_OPTIONS.map((item) => item.label)}
                value={selectedCurrency}
                onToggle={() =>
                  setOpenMenu(openMenu === "currency" ? null : "currency")
                }
              />{" "}
              <CustomSelect
                maxWidth="180px"
                label="Period"
                isOpen={openMenu === "period"}
                onSelect={(val) => {
                  setValue(
                    "period",
                    val as "per hour" | "per month" | "per year",
                    {
                      shouldValidate: true,
                    },
                  );
                  setOpenMenu(null);
                }}
                options={PERIOD_OPTIONS.map((item) => item.label)}
                value={selectedPeriod}
                onToggle={() =>
                  setOpenMenu(openMenu === "period" ? null : "period")
                }
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
