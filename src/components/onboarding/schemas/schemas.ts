import z from "zod";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export const step1Schema = z
  .object({
    firstName: z.string().min(3, "Name is too short"),
    lastName: z.string().min(3, "Surname is too short"),
    noResume: z.boolean(),
    resume: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.noResume) return;

    const file = data.resume instanceof FileList ? data.resume[0] : data.resume;

    if (
      !file ||
      (data.resume instanceof FileList && data.resume.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Try select again",
        path: ["resume"],
      });
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      ctx.addIssue({
        code: "custom",
        message: "File is too big (max 5MB)",
        path: ["resume"],
      });
      return;
    }

    if (file instanceof File && file.type !== "application/pdf") {
      ctx.addIssue({
        code: "custom",
        message: "Invalid file formats",
        path: ["resume"],
      });
      return;
    }
  });
export type Step1Values = z.infer<typeof step1Schema>;

const GENDERS = ["male", "female"] as const;

export const step2Schema = z
  .object({
    gender: z.enum(GENDERS, {
      message: "Please Select your gender",
    }),
    location: z.string().min(1, "Enter your location"),
    dateOfBirth: z.string().min(1, "Select your birth date"),

    readyToRelocate: z.boolean(),
    relocationLocations: z.array(z.string()),
    readyForWorkAbroad: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.readyToRelocate) {
      const hasValidLocation = data.relocationLocations.some(
        (loc) => loc.trim().length > 0,
      );
      if (!hasValidLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "enter city",
          path: ["relocationLocations"],
        });
      }
    }
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

export const step5Schema = z.object({
  employmentType: z.array(z.string()).min(1, "Select at least one option"),
});

export type Step5Values = z.infer<typeof step5Schema>;
export const step6Schema = z.object({
  searchMode: z.string().min(1, "Select someone mode"),
});

export type step6Values = z.infer<typeof step6Schema>;

export const onboardingDbSchema = z
  .object({
    firstName: step1Schema.shape.firstName,
    lastName: step1Schema.shape.lastName,

    gender: step2Schema.shape.gender,
    location: step2Schema.shape.location,
    dateOfBirth: step2Schema.shape.dateOfBirth,
    readyToRelocate: step2Schema.shape.readyToRelocate,
    readyForWorkAbroad: step2Schema.shape.readyForWorkAbroad,

    lastWorkplace: step4Schema.shape.lastWorkplace,
    previousPosition: step4Schema.shape.previousPosition,
    experienceDuration: step4Schema.shape.experienceDuration,

    searchMode: step6Schema.shape.searchMode,

    role: z.string().default("applicant"),
    isCompleted: z.boolean().default(true),

    salaryCurrency: z.string().default("USD"),
    salaryPeriod: z.string().default("month"),

    salaryAmount: z.string().nullable().optional(),
    aboutMe: z.string().nullable().optional(),
    resumeUrl: z.string().nullable().optional(),
  })
  .strip();
