import z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const EmployerRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "At least 5 characters"),
  phone: z.string().refine((val) => isValidPhoneNumber(val), {
    message: "Invalid phone number format",
  }),
  companyName: z.string().min(2, "Title is required"),
});

export const EmployerLoginSchema = EmployerRegistrationSchema.pick({
  email: true,
  password: true,
});

export type EmployerLoginValue = z.infer<typeof EmployerLoginSchema>;

export type EmployerRegistrationValue = z.infer<
  typeof EmployerRegistrationSchema
>;
