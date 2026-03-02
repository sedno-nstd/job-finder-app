"use client";
import { BriefcaseBusiness, ShoppingBag } from "lucide-react";
import { employerRegistrationData } from "./constans/type";
import { Controller, useForm } from "react-hook-form";
import {
  EmployerRegistrationSchema,
  EmployerRegistrationValue,
} from "./schema/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployer } from "@/src/actions/employer/createEmployer";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { signIn } from "next-auth/react";

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

    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: EmployerRegistrationValue) => {
    try {
      await createEmployer(data as any);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Login failed after registration", result.error);
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/vacancies");
      }, 1500);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-lg p-8 flex flex-col justify-center items-center bg-white"
    >
      <div className="p-4 flex flex-row items-center mb-6 bg-[#e9f3fe] rounded-xl border border-blue-100">
        <div className="flex-shrink-0">
          <BriefcaseBusiness
            size={24}
            strokeWidth={2}
            className="text-blue-600"
          />
        </div>

        <span className="ml-4 text-[15px] sm:text-base font-medium text-gray-800 leading-tight">
          This page is for employers. If you are looking for a job —{" "}
          <a
            href="/registration"
            className="text-blue-600 hover:underline font-semibold transition-all"
          >
            go to applicant page
          </a>
        </span>
      </div>
      {employerRegistrationData.slice(0, 3).map((item) => {
        const fieldError =
          errors[item.value as keyof EmployerRegistrationValue];
        return (
          <div key={item.value} className="flex flex-col w-full mb-6">
            <span className=" font-semibold mb-2">{item.label}</span>
            <input
              placeholder={item.placeholder}
              {...register(item.value as keyof EmployerRegistrationValue)}
              className="outline-none h-[48px] duration-200 transition-all hover:border-blue-600 focus:border-blue-600 border border-gray-300 px-4 rounded-lg"
            />
            {fieldError && (
              <span className="text-md text-red-500 font-medium mt-2">
                {fieldError.message}
              </span>
            )}
          </div>
        );
      })}
      <div className="relative w-full mb-6">
        <span className="mb-2 block font-semibold">Phone number</span>
        <div className="flex flex-row">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="US"
                limitMaxLength={true}
                international
                withCountryCallingCode
                className="flex items-center outline-none w-full h-[48px] border border-gray-300 rounded-lg px-3 focus-within:border-gray-900 hover:border-gray-900  transition-all duration-200 [&_input]:outline-none [&_input]:ml-3"
              />
            )}
          />
        </div>
        {errors.phone && (
          <span className="text-md text-red-500 font-medium mt-2 block">
            {errors.phone.message}
          </span>
        )}
      </div>
      {employerRegistrationData.slice(3, 4).map((item) => (
        <div key={item.value} className="flex flex-col w-full mb-6">
          <span className=" font-semibold mb-2">{item.label}</span>
          <input
            placeholder={item.placeholder}
            {...register(item.value as keyof EmployerRegistrationValue)}
            className="outline-none h-[48px] duration-200 transition-all hover:border-blue-600 focus:border-blue-600 border border-gray-300 px-4 rounded-lg"
          />
          {errors.companyName && (
            <span className="text-md text-red-500 font-medium mt-2 block">
              {errors.companyName.message}
            </span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className={clsx(
          "text-white font-medium w-full h-[48px] duration-200 transition-all rounded-lg mt-4",
          {
            "bg-green-400 cursor-default": isSuccess,
            "bg-blue-600 hover:bg-blue-700 cursor-pointer": !isSuccess,
          },
        )}
      >
        {isSuccess ? "Success" : "Complete"}
      </button>
    </form>
  );
}
