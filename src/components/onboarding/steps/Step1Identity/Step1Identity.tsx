"use client";
import { IdentityFields } from "./parts/IdentityFields";
import { ResumeSection } from "./parts/ResumeSection";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { useStep1Logic } from "./parts/useStep1Logic";
import { FormProvider } from "react-hook-form";

export function Step1Identity() {
  const { methods, onSubmit, isUploading } = useStep1Logic();
  return (
    <div className="w-full min-h-screen flex justify-center items-start text-[#2d3540] duration-200 transition-all">
      <FormProvider {...methods}>
        <FormWrapper
          onSubmit={onSubmit}
          label="Log in or create a profile in a way convenient for you"
          className="max-w-[448px] bg-white mt-10 px-6 py-8"
        >
          <div className="flex flex-col gap-4">
            <IdentityFields />
            <ResumeSection />
          </div>
          <FormNavigation
            variant="update"
            secondButtonClasses="mt-2"
            buttonText={isUploading ? "Uploading..." : "continue"}
          />
        </FormWrapper>
      </FormProvider>
    </div>
  );
}
