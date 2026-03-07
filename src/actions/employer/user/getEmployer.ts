"use server";
import { authConfig } from "@/src/config/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export async function GetEmployer(employerEmail: string, password: string) {
  const data = await getServerSession(authConfig);

  if (!data?.user.id) console.log("Error");

  const employer = await prisma.employer.findUnique({
    where: { email: employerEmail },
  });

  if (!employer) {
    return {
      isEmailFound: false,
      isPasswordMatch: false,
      user: null,
    };
  }
  const isPasswordMatch = await bcrypt.compare(password, employer.password);

  if (!isPasswordMatch) {
    return {
      isEmailFound: true,
      isPasswordMatch: false,
      user: null,
    };
  }

  const { password: _, ...safeEmployer } = employer;

  return {
    isEmailFound: true,
    isPasswordMatch: true,
    user: safeEmployer,
  };
}
