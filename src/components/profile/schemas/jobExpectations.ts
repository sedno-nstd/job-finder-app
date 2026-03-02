import z from "zod";

export const SalarySchema = z
  .object({
    amount: z.string(),
    currency: z.enum(["USD", "UAH", "EUR"]),
    period: z.enum(["year", "month", "hour"]),
    employmentTypes: z.array(z.string()).min(1, "Select at least one type"),
  })
  .superRefine((val, ctx) => {
    if (
      val.currency !== "UAH" &&
      val.period !== "year" &&
      val.amount.length > 6
    ) {
      ctx.addIssue({
        code: "custom",
        message: "To much salary",
      });
    }
  });

export type SalaryValues = z.infer<typeof SalarySchema>;
