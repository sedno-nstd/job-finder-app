import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import z from "zod";

export const DesiredJobSchema = z.object({
  desiredJobs: z
    .array(z.enum(POPULAR_PROFESSIONS as unknown as [string, ...string[]]))
    .min(1, "Select at least 1 profession"),
});

export type DesiredJobValue = z.infer<typeof DesiredJobSchema>;
