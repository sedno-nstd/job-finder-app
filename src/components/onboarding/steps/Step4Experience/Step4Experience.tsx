"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { EXPERIENCE_OPTIONS } from "../../constants/jobOptions";
import { FormProvider, useForm } from "react-hook-form";
import { step4Schema, Step4Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { FormField } from "@/src/components/ui/formInput";
import { LastWorkPlace } from "./parts/LastWorkPlace";

export function Step4Experience() {
  const { formData, nextStep, updatedFields, prevStep } = useOnboardingStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const methods = useForm<Step4Values>({
    mode: "onChange",
    resolver: zodResolver(step4Schema),
    defaultValues: {
      experienceDuration: formData.onBoarding.experienceDuration || "",
      previousPosition: formData.onBoarding.previousPosition || "",
      lastWorkplace: formData.onBoarding.lastWorkplace || "",
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isValid },
  } = methods;

  const previousPosition = watch("previousPosition") || "";

  const professionFiltered = POPULAR_PROFESSIONS.filter((item) =>
    item.toLowerCase().includes(previousPosition.toLowerCase()),
  );

  const onSubmit = (data: Step4Values) => {
    updatedFields("onBoarding", data);
    nextStep();
  };

  return (
    <div className="flex-1 flex items-center justify-center text-main">
      <FormProvider {...methods}>
        <form
          className="
          flex flex-col w-full bg-white relative py-8 px-6
          sm:max-w-[448px] sm:rounded-lg sm:shadow-sm sm:my-8 
          max-sm:h-full max-sm:shadow-none max-sm:rounded-none max-sm:justify-center
          "
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            type="button"
            className="
            absolute cursor-pointer text-blue-600 top-4 left-4
            max-sm:top-6 sm:top-6
            md:hidden
            "
            onClick={() => prevStep()}
          >
            <span className="flex flex-row">
              <ArrowLeft />
              Back
            </span>
          </button>
          <div
            className="max-sm:mt-2
          sm:mt-2
          "
          >
            <h1 className="text-3xl font-medium mb-5 mt-4">
              Last worked place
            </h1>
          </div>

          <div className="flex flex-col mb-5 w-full">
            <LastWorkPlace />
          </div>

          <div className="mb-6 w-full">
            <div className="flex flex-col relative">
              <label htmlFor="" className="mb-1">
                Previous position
              </label>
              <FormField
                {...register("previousPosition", {
                  onChange: (e) => {
                    setShowSuggestions(e.target.value.length > 2);
                  },
                })}
                id="lastWorkplace"
                type="text"
                placeholder="Company title"
              />
              {showSuggestions && previousPosition.length >= 2 && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white z-20 border border-secondary shadow-xl rounded-md overflow-hidden">
                  {professionFiltered.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-main transition-colors border-b last:border-none border-gray-100"
                      onClick={() => {
                        setValue("previousPosition", item, {
                          shouldValidate: true,
                        });
                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 w-full max-sm:mb-8">
            <label
              htmlFor=""
              className="text-sm font-medium mb-2 max-sm:text-base"
            >
              Duration of stay
            </label>
            <select
              className="border border-secondary w-full relative rounded-md px-2 h-[40px] outline-none focus:border-blue-600"
              {...register("experienceDuration")}
            >
              {EXPERIENCE_OPTIONS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="pt-4 absolute"
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-row gap-2">
              <button
                type="button"
                className="w-1/2 cursor-pointer bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg py-2 transition-all font-medium
            
            "
                onClick={() => prevStep()}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700  text-white rounded-lg py-2 transition-all font-medium"
              >
                Continue
              </button>
            </div>
            <button
              type="button"
              className="flex-1 cursor-pointer font-semibold text-blue-600 rounded-lg py-2 transition-all"
              onClick={() => {
                setValue("lastWorkplace", "None");
                setValue("previousPosition", "None");
                setValue("experienceDuration", "no_experience");
                handleSubmit(onSubmit)();
              }}
            >
              Haven't expierence
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
