"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useUploadThing } from "@/src/utils/uploadthing";
import { FormProvider, useForm } from "react-hook-form";
import { IdentityFields } from "./parts/IdentityFields";
import { ResumeSection } from "./parts/ResumeSection";
import { step1Schema, Step1Values } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function Step1Identity() {
  const { updatedFields, nextStep, formData } = useOnboardingStore();
  const [isUploading, setIsUploading] = useState(false);

  const methods = useForm<Step1Values>({
    mode: "onChange",
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.firstName,
      surname: formData.lastName,
      noResume: formData.continueWithoutResume || false,
      resumeUrl: formData.resumeUrl || "",
    },
  });

  const { handleSubmit, watch } = methods;

  const { startUpload } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      const fileUrl = res?.[0].url;

      const data = watch();

      updatedFields({
        firstName: data.name,
        lastName: data.surname,
        resumeUrl: fileUrl,
        continueWithoutResume: false,
      });
      nextStep();
    },
  });

  const onSubmit = async (data: Step1Values) => {
    if (data.noResume) {
      updatedFields({
        firstName: data.name,
        lastName: data.surname,
        resumeUrl: null,
        continueWithoutResume: true,
      });
      nextStep();
      return;
    }

    const file = data.resumeUrl?.[0];
    setIsUploading(true);
    await startUpload([file]);
    setIsUploading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center text-[#2d3540] duration-200 transition-all">
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-3 bg-white p-10 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="" className="text-3xl font-semibold mb-6">
            Log in or create a profile <br /> in a way convenient <br /> for you
          </label>
          <IdentityFields />
          <ResumeSection />

          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 duration-200 transition-all text-white p-2 rounded"
          >
            <span className="font-medium">
              {isUploading ? "Uploading..." : "Continue"}
            </span>
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
