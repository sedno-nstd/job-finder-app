import { prisma } from "@/lib/prisma";
import { EmploymentTypeId } from "@/src/domain/vacancy/mock";
export async function GetVacancies({ vacancyId }: { vacancyId: string }) {
  const vacancy = await prisma?.vacancy.findUnique({
    where: {
      id: vacancyId,
    },
    include: {
      application: {
        include: {
          applicant: true,
        },
      },
    },
  });
  if (!vacancy) return null;

  const formattedVacancy = {
    ...vacancy,
    employmentType: vacancy.employmentType as EmploymentTypeId,
    level: vacancy.level ? (vacancy.level.split(",") as any) : [],
    stack: vacancy.stack ? vacancy.stack.split(",") : [],
    currency: vacancy.currency as "USD" | "UAH" | "EUR",
    salaryPeriod: vacancy.salaryPeriod as "hour" | "month",
  };

  return formattedVacancy;
}
