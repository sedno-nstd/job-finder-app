"use server";
import { prisma } from "@/lib/prisma";
import { Vacancy } from "@/src/config/types";
export async function GetExpiringVacancies(EmployerId: string) {
  const employer = await prisma.employer.findUnique({
    where: { id: EmployerId },
  });

  if (!employer) {
    console.log("Error");
    return [];
  }

  const vacancies = (await prisma.vacancy.findMany({
    where: { employerId: employer?.id, expiresAt: { gt: new Date() } },
    orderBy: { expiresAt: "asc" },
  })) as unknown as Vacancy[];

  return vacancies;
}
