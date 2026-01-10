import z from "zod";

export const step1Schema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    surname: z.string().min(3, "Surname is too short"),
    noResume: z.boolean(),
    resumeUrl: z.any().optional(),
  })
  .refine(
    (data) => {
      if (!data.noResume) {
        return data.resumeUrl && data.resumeUrl.length > 0;
      }
      return true;
    },
    {
      message: "Please upload a resume or check the box",
      path: ["resumeFile"],
    }
  );
export type Step1Values = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  gender: z.string().min(1),
  location: z.string().min(1),
  dateOfBirth: z.string(),

  readyToRelocate: z.boolean(),
  relocationLocations: z.array(z.string()),
  readyForWorkAbroad: z.boolean(),
});

export type Step2Values = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  desiredJob: z.array(z.string().min(1, "Choose at least 1 option")),
});

export type Step3Values = z.infer<typeof step3Schema>;

export const step4Schema = z.object({
  lastWorkplace: z.string().min(2),
  previousPosition: z.string().min(2),
  experienceDuration: z.string().min(1),
});

export type Step4Values = z.infer<typeof step4Schema>;

export const step5Values = z
  .array(z.string())
  .min(1, "Select at least one option");

export const step6Schema = z.string().min(1, "Select someone mode");
