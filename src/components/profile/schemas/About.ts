import z from "zod";

export const AboutSchema = z.object({
  about: z.string().min(1, "Write at least one word"),
});

export type AboutValue = z.infer<typeof AboutSchema>;
