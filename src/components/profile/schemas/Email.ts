import z from "zod";

export const EmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "To long Email")
    .email()
    .toLowerCase()
    .trim(),
});

export type EmailValue = z.infer<typeof EmailSchema>;
