"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { EmployerRegistration } from "../../../types/employer";

export async function createEmployer(
  data: Omit<
    EmployerRegistration,
    "id" | "updatedAt" | "createdAt" | "vacancies"
  >,
) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const employer = await prisma.employer.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return employer;
}
