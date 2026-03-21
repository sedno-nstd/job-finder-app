"use client";
import { employerRegistrationData } from "../constans/type";
import { FormProvider, useForm } from "react-hook-form";
import {
  EmployerRegistrationSchema,
  EmployerRegistrationValue,
} from "../schema/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployer } from "@/src/actions/employer/user/createEmployer";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormWrapper } from "../../shared/FormWrapper";
import { FormNavigation } from "../../shared/FormNavigation";
import { EmployerRegistrationBanner } from "./parts/EmployerRegistrationBanner";
import { FormField } from "../../ui/base/FormField";
import { PhoneForm } from "../../ui/FormPhone";

export function EmployerRegistration() {
  const methods = useForm<EmployerRegistrationValue>({
    resolver: zodResolver(EmployerRegistrationSchema),
    mode: "onChange",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: EmployerRegistrationValue) => {
    try {
      const result = await createEmployer(data);

      if (!result.success) {
        if (result.field) {
          setError(result.field as keyof EmployerRegistrationValue, {
            type: "server",
            message: result.message,
          });
        } else {
          console.error(result.message);
        }

        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        console.error("Login failed after registration");
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/vacancies");
      }, 1500);
    } catch (error) {
      setIsSuccess(false);
      console.error("Registration failed", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-lg p-8 flex flex-col justify-center items-center bg-white"
      >
        <EmployerRegistrationBanner />
        {employerRegistrationData.map((item) => {
          const fieldName = item.value as keyof EmployerRegistrationValue;
          const errorMessage = errors[fieldName]?.message;

          if (fieldName === "phone") {
            return (
              <PhoneForm
                key={fieldName}
                name="phone"
                variant="hook-form"
                label={item.label}
              />
            );
          }
          return (
            <FormField
              key={fieldName}
              className="mb-4"
              {...register(fieldName)}
              label={item.label}
              placeholder={item.placeholder}
              error={errorMessage}
              type={fieldName === "password" ? "password" : "text"}
            />
          );
        })}

        <FormNavigation
          secondButtonClasses="mt-5"
          variant="update"
          buttonText={isSuccess ? "Success" : "Complete"}
        />
      </FormWrapper>
    </FormProvider>
  );
}
