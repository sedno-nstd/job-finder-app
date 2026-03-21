"use server";
import { prisma } from "@/lib/prisma";
import { JobLevel, Vacancy } from "../../config/types";
import { EmploymentTypeId } from "../../domain/vacancy/mock";
import { getServerSession } from "next-auth";
import { authConfig } from "../../config/auth";

export async function getRespondVacancies() {
  const session = await getServerSession(authConfig);
  const myId = session?.user.id;
  if (!myId)
    return {
      success: false,
      error: true,
    };
  const applications = await prisma?.application.findMany({
    where: { applicantId: myId },
    include: {
      vacancy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!applications) return null;

  const uniqueVacancies = Array.from(
    new Map(applications.map((app) => [app.vacancy.id, app])).values(),
  );

  return uniqueVacancies.map((app) => {
    const { vacancy } = app;

    return {
      id: vacancy.id,
      title: vacancy.title,
      company: vacancy.company,
      description: vacancy.description,
      salaryFrom: vacancy.salaryFrom,
      salaryTo: vacancy.salaryTo,
      currency: vacancy.currency as Vacancy["currency"],
      salaryPeriod: vacancy.salaryPeriod as Vacancy["salaryPeriod"],
      negotiable: vacancy.negotiable,
      city: vacancy.city || undefined,
      country: vacancy.country || "Unknown",
      level: [vacancy.level as unknown as JobLevel],
      stack: vacancy.stack ? vacancy.stack.split(",") : [],
      jobLocation: vacancy.employmentType as EmploymentTypeId,
      postedAt: vacancy.postedAt.toISOString(),
    };
  });
}

export async function DeleteResponde(vacancyId: string) {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "User does not exist" };
  try {
    await prisma.application.deleteMany({
      where: { applicantId: userId, vacancyId: vacancyId },
    });
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Failed to delete" };
  }
}

export async function hasUserApplied(vacancyId: string) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.id) return false;

  const count = await prisma.application.count({
    where: {
      applicantId: session.user.id,
      vacancyId: vacancyId,
    },
  });

  return count > 0;
}
