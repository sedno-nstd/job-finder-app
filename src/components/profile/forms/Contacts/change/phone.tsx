"use client";
import { EnterPhone } from "@/src/actions/applicant/phone/enterPhone";
import { UpdatePhone } from "@/src/actions/common/update-phone/updatePhone";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { PhoneForm } from "@/src/components/ui/FormPhone";
import { Input } from "@/src/components/ui/search/JobSearchForm";
import { ROUTES } from "@/src/config/router";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getFullUserData } from "@/src/actions/applicant/getFullUserData";

export function ChangeApplicantPhone({ className }: { className?: string }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const methods = useForm({
    defaultValues: { phone: "", token: "" },
  });

  const { register, getValues, reset } = methods;

  const onSubmit = async (data: { phone: string; token: string }) => {
    setError("");

    if (step === 1) {
      const res = await EnterPhone(data.phone);
      if (res.success) {
        setStep(2);
      } else {
        setError(res.error || "Failed to send code");
      }
    } else {
      const res = await UpdatePhone(data.token, data.phone);
      if (res.success) {
        router.push(ROUTES.PROFILE.ROOT);
        router.refresh();
      } else {
        setError(res.error || "Invalid code");
      }
    }
  };

  useEffect(() => {
    const handleGetInitialState = async () => {
      try {
        const res = await getFullUserData();
        if (res.success && res.data?.userProfile.phone) {
          reset({
            phone: res.data.userProfile.phone,
            token: "",
          });
        }
      } catch (err) {
        console.log("Error loading phone:", err);
      }
    };
    handleGetInitialState();
  }, [reset]);

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col justify-center items-start",
        className,
      )}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <FormWrapper as="div" className="py-8">
            {step === 1 ? (
              <PhoneForm
                name="phone"
                variant="hook-form"
                label="Enter your new phone"
              />
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">Enter SMS Code</label>
                <Input
                  {...register("token")}
                  placeholder="000000"
                  className="text-center letter-spacing-widest border-x"
                />
                <p className="text-xs text-gray-500 mb-2 mt-1">
                  Code sent to {getValues("phone")}
                </p>
              </div>
            )}

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <FormNavigation variant="update" />
          </FormWrapper>
        </form>
      </FormProvider>
    </div>
  );
}
