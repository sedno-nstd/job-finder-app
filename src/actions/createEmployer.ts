"use server";
import { Employer } from "@prisma/client";
import bcrypt from "bcrypt";

export async function createEmployer(
  data: Omit<Employer, "id" | "updatedAt" | "createdAt" | "vacancies">,
) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const employer = await prisma?.employer.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  return employer;
}
