"use server";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/src/config/auth";
import { JobLevel, Vacancy } from "@/src/config/types";
import { EmploymentTypeId } from "@/src/domain/vacancy/types";
import { getServerSession } from "next-auth";

export async function GetVacancies() {
  const session = await getServerSession(authConfig);
  const userId = session?.user.id;

  if (!userId || session?.user?.role !== "employer") {
    throw new Error("Unauthorized: Only employers can access this data.");
  }

  const vacancies = await prisma.vacancy.findMany({
    where: {
      employerId: userId,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      application: {
        select: {
          id: true,
          status: true,
          applicant: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return vacancies.map((v) => ({
    ...v,
    application: v.application,

    level: (v.level ? v.level.split(",") : []) as JobLevel[],
    stack: v.stack ? v.stack.split(",") : [],
    currency: v.currency as "USD" | "UAH" | "EUR",
    salaryPeriod: v.salaryPeriod as "hour" | "month",
    employmentType: v.employmentType as EmploymentTypeId,
  }));
}
