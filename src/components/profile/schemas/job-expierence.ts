import z from "zod";
import { POPULAR_PROFESSIONS } from "../../constans/search-data";
import { EXPERIENCE_OPTIONS } from "../../onboarding/constants/jobOptions";

const EXP_VALUES = EXPERIENCE_OPTIONS.map((opt) => opt.value) as [
  string,
  ...string[],
];

export const jobExpierenceSchema = z.object({
  previousWorkedPlace: z.string().min(2),
  previousPosition: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Too long"),
  experienceDuration: z.enum(EXP_VALUES),
  mainResponsibility: z.string(),
});

export type jobExpierenceValues = z.infer<typeof jobExpierenceSchema>;
