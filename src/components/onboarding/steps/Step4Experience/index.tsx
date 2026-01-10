"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { EXPERIENCE_OPTIONS } from "../../constants/jobOptions";
import { FormProvider, useForm } from "react-hook-form";
import { step4Schema, Step4Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";

export function Step4Experience() {
  const { formData, nextStep, updatedFields, prevStep } = useOnboardingStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const methods = useForm<Step4Values>({
    mode: "onChange",
    resolver: zodResolver(step4Schema),
    defaultValues: {
      experienceDuration: formData.experienceDuration || "",
      previousPosition: formData.previousPosition || "",
      lastWorkplace: formData.lastWorkplace || "",
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
    item.toLowerCase().includes(previousPosition.toLowerCase())
  );

  const onSubmit = (data: Step4Values) => {
    updatedFields(data);
    nextStep();
  };

  return (
    <div className="flex-1 flex items-center justify-center text-main">
      <FormProvider {...methods}>
        <form
          className="
          flex flex-col w-full bg-white relative py-8 px-6
          sm:max-w-[448px] sm:rounded-lg sm:shadow-sm sm:my-8 
          max-sm:min-h-screen max-sm:shadow-none max-sm:rounded-none max-sm:justify-center
          "
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            type="button"
            className="
            cursor-pointer absolute
            max-sm:top-6 max-sm:left-6 
            sm:top-3 sm:left-3
            "
            onClick={() => prevStep()}
          >
            <ArrowLeft size={26} className="text-blue-600" />
          </button>
          <div className="max-sm:mb-12">
            <h1 className="text-3xl font-medium mb-5 mt-4">
              Last worked place
            </h1>
          </div>

          <div className="flex flex-col mb-5 w-full">
            <label
              htmlFor="lastWorkplace"
              className="text-sm font-medium mb-2 max-sm:text-base"
            >
              Last Workplace
            </label>
            <input
              className="border border-secondary rounded-md px-3 h-[40px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
              id="lastWorkplace"
              type="text"
              placeholder="Company title"
              {...register("lastWorkplace")}
            />
          </div>

          <div className="mb-6 w-full">
            <div className="flex flex-col relative">
              <label
                htmlFor=""
                className="text-sm font-medium mb-2 max-sm:text-base"
              >
                Previous position
              </label>
              <input
                className="border relative border-secondary rounded-md px-3 h-[40px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
                type="text"
                placeholder="Potition title"
                {...register("previousPosition", {
                  onChange: (e) => {
                    setShowSuggestions(e.target.value.length > 2);
                  },
                })}
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
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700  text-white rounded-lg py-2 transition-all font-medium"
            >
              Continue
            </button>
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
