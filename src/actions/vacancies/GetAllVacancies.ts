"use server";
import { JobLevel } from "../config/types";
import { EmploymentTypeId } from "../domain/vacancy/mock";

export async function GetAllVacancies() {
  const vacancies = await prisma?.vacancy.findMany({
    orderBy: {
      postedAt: "desc",
    },
  });

  if (!vacancies) return [];

  return vacancies.map((v) => ({
    ...v,
    level: (v.level ? v.level.split(",") : []) as JobLevel[],
    stack: v.stack ? v.stack.split(",") : [],
    currency: v.currency as "USD" | "UAH" | "EUR",
    salaryPeriod: v.salaryPeriod as "hour" | "month",
    employmentType: v.employmentType as EmploymentTypeId,
  }));
}
