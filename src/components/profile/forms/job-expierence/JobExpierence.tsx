"use client";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { FormProvider, useForm } from "react-hook-form";
import {
  jobExpierenceSchema,
  jobExpierenceValues,
} from "../../schemas/job-expierence";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/config/router";
import { LastWorkPlace } from "@/src/components/onboarding/steps/Step4Experience/parts/LastWorkPlace";
import { ProfessionField } from "@/src/components/onboarding/steps/Step4Experience/parts/ProfessionField";
import { WorkExpierence } from "@/src/components/onboarding/steps/Step4Experience/parts/WorkExpierence";
import { VoiceTextArea } from "@/src/components/shared/VoiceTextArea";

interface Props {
  className?: string;
}

export function JobExpierence({ className }: Props) {
  const { formData } = useOnboardingStore();
  const router = useRouter();

  const methods = useForm<jobExpierenceValues>({
    mode: "onChange",
    resolver: zodResolver(jobExpierenceSchema),
    defaultValues: {
      experienceDuration: formData.onBoarding.experienceDuration,
      mainResponsibility: formData.userProfile.aboutMe,
      previousPosition: formData.onBoarding.previousPosition,
      previousWorkedPlace: formData.onBoarding.lastWorkplace,
    },
  });

  const { handleSubmit, watch, setValue, register } = methods;
  const mainResponsibility = watch("mainResponsibility");

  const onSubmit = (data: jobExpierenceValues) => {
    try {
      const fullData = {
        ...formData,
        experienceDuration: data.experienceDuration,
        aboutMe: data.mainResponsibility,
        previousPosition: data.previousPosition,
        previousWorkedPlace: data.previousWorkedPlace,
      };

      const res = saveOnboardingData(fullData);
      if (!res) console.log("Error");
      router.push(ROUTES.PROFILE.ROOT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper
        as="form"
        label="Job expierence"
        onSubmit={handleSubmit(onSubmit)}
        className={className}
      >
        <LastWorkPlace
          name="previousWorkedPlace"
          label="Previous worked place"
          className="mb-5"
        />
        <ProfessionField
          name="previousPosition"
          label="Previous Position"
          className="mb-5"
        />
        <WorkExpierence
          name="experienceDuration"
          label="Job experence"
          className="mb-5"
        />
        <VoiceTextArea
          placeHolderClasses=""
          label="Main responsibilities"
          value={mainResponsibility}
          onChange={(val) =>
            setValue("mainResponsibility", val, { shouldValidate: true })
          }
        />
        <FormNavigation variant="update" secondButtonClasses="mt-5" />
      </FormWrapper>
    </FormProvider>
  );
}
