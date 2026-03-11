import z from "zod";

export const AboutSchema = z.object({
  about: z.string(),
});

export type AboutValue = z.infer<typeof AboutSchema>;
