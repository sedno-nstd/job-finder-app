import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { step1Schema, Step1Values } from "../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/src/utils/uploadthing";

export function useStep1Logic() {
  const { updatedFields, nextStep, formData } = useOnboardingStore();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);

  const methods = useForm<Step1Values>({
    mode: "onChange",
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.onBoarding.firstName,
      lastName: formData.onBoarding.lastName,
      noResume: formData.onBoarding.continueWithoutResume || false,
      resume: formData.onBoarding.resume,
    },
  });

  const { handleSubmit, watch } = methods;

  const { startUpload } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      const uploadedFile = res?.[0];

      const data = watch();

      updatedFields("onBoarding", {
        firstName: data.firstName,
        lastName: data.lastName,
        resume: {
          url: uploadedFile.url,
          name: uploadedFile.name,
          size: (uploadedFile.size / 1024 / 1024).toFixed(2) + " MB",
        },
        continueWithoutResume: false,
      });
      setIsUploading(false);
      nextStep();
    },
  });

  const onSubmit = async (data: Step1Values) => {
    try {
      if (data.noResume) {
        updatedFields("onBoarding", {
          firstName: data.firstName,
          lastName: data.lastName,
          resume: null,
          continueWithoutResume: true,
        });
        setError(false);
        setIsUploading(false);
        nextStep();
        return;
      }

      const file =
        data.resume instanceof FileList ? data.resume[0] : data.resume;

      if (!file) return;

      if (typeof file === "object" && "url" in file) {
        updatedFields("onBoarding", {
          firstName: data.firstName,
          lastName: data.lastName,
          resume: file,
          continueWithoutResume: false,
        });
        setIsUploading(false);
        nextStep();
        return;
      }

      setIsUploading(true);
      await startUpload([file]);
    } catch (err: any) {
      console.log(err);
      setError(true);
    }
  };
  return { methods, isUploading, onSubmit: handleSubmit(onSubmit), error };
}
