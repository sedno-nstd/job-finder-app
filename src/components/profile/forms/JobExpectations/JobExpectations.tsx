"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { SALARY_SELECTS } from "../../constants/jobExpectations";
import { useState } from "react";
import { SalarySchema, SalaryValues } from "../../schemas/jobExpectations";
import { FormSelect } from "@/src/components/shared/FormField/FormSelect";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { EmploymentTypeGroup } from "@/src/components/shared/FormField/EmploymentTypeGroup";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/router";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { DesiredSalary } from "./parts/DesiredSalary";

export function JobExpectations() {
  const { formData, updatedFields } = useOnboardingStore();
  const [openMenu, setOpenMenu] = useState<"currency" | "period" | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

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

  const { handleSubmit } = methods;

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

      setSuccess(true);
      router.push(ROUTES.PROFILE.ROOT);
    } catch (err) {
      setSuccess(false);
      console.log("Failed to save:", err);
    }
  };

  return (
    <div className="w-full h-full text-main flex items-center justify-center">
      <FormProvider {...methods}>
        <FormWrapper
          as="form"
          className="py-6"
          onSubmit={handleSubmit(onSubmit)}
          label="Desired salary and employment type"
        >
          <div className="flex flex-col">
            <DesiredSalary />
            <div className="flex flex-row justify-between mb-6">
              {SALARY_SELECTS.map((item) => (
                <FormSelect
                  key={item.name}
                  data={item.data}
                  isOpen={openMenu === item.name}
                  label={item.defaultLabel}
                  name={item.name}
                  setIsOpen={() =>
                    setOpenMenu(openMenu === item.name ? null : item.name)
                  }
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="mb-2 font-medium">Desired employment type</span>
          </div>
          <EmploymentTypeGroup
            name="employmentTypes"
            variant="list"
            className="mb-6"
          />
          <FormNavigation
            variant="update"
            buttonText={success ? "Complete" : "Save"}
          />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
