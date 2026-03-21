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
  const emailExists = await prisma.employer.findUnique({
    where: { email: data.email },
  });

  const emailInEmployer = await prisma.employer.findUnique({
    where: { email: data.email },
  });
  const emailInUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (emailInEmployer || emailInUser) {
    return {
      success: false,
      message: "This account with this email already exist",
    };
  }

  if (emailExists) {
    return {
      success: false,
      field: "email",
      message: "Email already in use",
    };
  }

  const companyExists = await prisma.employer.findUnique({
    where: { companyName: data.companyName },
  });

  if (companyExists) {
    return {
      success: false,
      field: "companyName",
      message: "Company already exists",
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
