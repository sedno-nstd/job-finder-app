import { JOB_LEVELS } from "@/src/config/searchOptions";
import { stacks } from "@/src/domain/vacancy/types";
import z from "zod";

export const flatStacks = stacks.flat() as [string, ...string[]];

const EmploymentTypeSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export const vacancySchema = z
  .object({
    title: z.string().min(2, "Please enter your job title"),
    level: z.array(z.enum(JOB_LEVELS)).min(1, "Select at least one level"),
    stack: z.array(z.enum(flatStacks)).min(1, "Select at least one technology"),
    employmentType: z
      .array(EmploymentTypeSchema)
      .min(1, "Select at least one type"),

    company: z.string().min(1, "Company name is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().optional(),

    salaryFrom: z.string().trim().optional(),
    salaryTo: z.string().trim().optional(),
    currency: z.enum(["USD", "EUR", "UAH"]),
    salaryPeriod: z.enum(["year", "month", "hour"]),
    negotiable: z.boolean(),
    description: z.string().min(1, "Description is too short"),
  })
  .superRefine((data, ctx) => {
    const isRemoteSelected = data.employmentType.some(
      (type) => type.id === "remote",
    );

    if (!isRemoteSelected && (!data.city || data.city.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required for non-remote roles",
        path: ["city"],
      });
    }
    if (!data.negotiable) {
      if (!data.salaryFrom || data.salaryFrom.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["salaryFrom"],
        });
      }
      if (!data.salaryTo || data.salaryTo.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Required",
          path: ["salaryTo"],
        });
      }
    }
  });

export type VacancyFormValues = z.infer<typeof vacancySchema>;
