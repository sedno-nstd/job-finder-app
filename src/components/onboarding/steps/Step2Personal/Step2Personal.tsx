"use client";
import clsx from "clsx";
import "react-day-picker/dist/style.css";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormProvider, useForm } from "react-hook-form";
import { step2Schema, Step2Values } from "../../schemas/schemas";
import { GenderSection } from "./parts/GenderSection";
import { Birthday } from "./parts/Birthday";
import { LocationSection } from "./parts/LocationSection";
import { RelocationSection } from "./parts/RelocationSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

export function Step2Personal() {
  const { formData, nextStep, prevStep, updatedFields } = useOnboardingStore();

  const methods = useForm<Step2Values>({
    mode: "onChange",
    resolver: zodResolver(step2Schema),
    defaultValues: {
      gender: formData.gender || "",
      dateOfBirth: formData.dateOfBirth || "2000-01-01",
      location: formData.location || "",
      readyToRelocate: formData.readyToRelocate || false,
      relocationLocations: [] as string[],
      readyForWorkAbroad: formData.readyForWorkAbroad || false,
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: Step2Values) => {
    updatedFields(data);
    nextStep();
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center text-[#2d3540] bg-[#eff2f6]
    max-sm:jutisy-center max-sm:items-center
    "
    >
      <FormProvider {...methods}>
        <form
          className=" flex flex-col w-full bg-white relative py-8 px-6
        max-sm:min-h-screen max-sm:justify-center
        sm:w-full sm:rounded-lg sm:shadow-sm sm:my-8
        md:max-w-[600px]
        lg:max-w-[600px]
        xl:max-w-[448px]
          "
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            type="button"
            className="
            absolute  cursor-pointer text-blue-600 top-4 left-2
            max-sm:top-10
            "
            onClick={() => prevStep()}
          >
            <ArrowLeft>Back</ArrowLeft>
          </button>
          <label
            htmlFor=""
            className="text-3xl font-semibold mb-6 pt-3 cursor-text"
          >
            Exectly {formData.firstName}! Tell us a little about yourself.
          </label>

          <GenderSection />

          <Birthday />
          <LocationSection />
          <RelocationSection />
          <div
            className="flex flex-row pt-4 justify-center gap-1 
            max-sm:mt-2
          "
          >
            <button
              type="submit"
              className={clsx(
                "bg-blue-600 hover:bg-blue-700 duration-200 cursor-pointer transition-all text-white border  hover:text-white/90 rounded-lg py-2 px-6 max-sm:w-full",
                !isValid && "opacity-50 cursor-not-allowed"
              )}
            >
              Continue
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
