"use server";

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
    level: v.level ? v.level.split(",") : [],
    stack: v.stack ? v.stack.split(",") : [],
    currency: v.currency as "USD" | "UAH" | "EUR",
    salaryPeriod: v.salaryPeriod as "hour" | "month",
    jobLocation: v.jobLocation as EmploymentTypeId,
  }));
}
