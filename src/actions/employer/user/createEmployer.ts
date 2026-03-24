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
  const [emailInEmployer, emailInUser] = await Promise.all([
    prisma.employer.findUnique({ where: { email: data.email } }),
    prisma.user.findUnique({ where: { email: data.email } }),
  ]);

  if (emailInEmployer || emailInUser) {
    return {
      success: false,
      message: "This account with this email already exist",
    };
  }

  const companyExists = await prisma.employer.findUnique({
    where: { companyName: data.companyName },
  });

  if (companyExists) {
    return {
      success: false,
      field: "companyName",
      message: "Company with this name already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const employer = await prisma.employer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return {
      success: true,
      data: employer,
    };
  } catch (err) {
    return {
      success: false,
      error: { field: "root", message: "Something went wrong" },
    };
  }
}
