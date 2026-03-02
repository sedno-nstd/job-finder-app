"use server";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../../config/auth";
import { getServerSession } from "next-auth";
import { Vacancy } from "@/src/config/types";

export type CreateVacancyInput = Omit<
  Vacancy,
  "id" | "postedAt" | "employerId" | "expiresAt" | "level" | "stack"
> & {
  level: string;
  stack: string;
};
export async function createVacancyAction(data: CreateVacancyInput) {
  const session = await getServerSession(authConfig);

  if (!session?.user) throw new Error("User does not exist");
  const currentUserId = (session.user as any).id;

  const { ...vacancyData } = data;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const vacancy = await prisma.vacancy.create({
    data: {
      ...vacancyData,
      level: vacancyData.level,
      stack: vacancyData.stack,
      employmentType: Array.isArray(data.employmentType)
        ? data.employmentType.map((t) => t.id).join(",")
        : data.employmentType,
      employerId: currentUserId,
      expiresAt: expirationDate,
    },
  });
  return vacancy;
}
