"use server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function requestPasswordReset(email: string) {
  if (!email)
    return {
      success: false,
    };

  const employer = await prisma.employer.findUnique({
    where: { email: email },
  });

  if (!employer) {
    console.log(`${email} not found`);
    return { success: true };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const expiry = new Date(Date.now() + 3600000);

  await prisma.employer.update({
    where: { email: email },
    data: {
      resetToken: resetToken,
      resetTokenExpiry: expiry,
    },
  });

  console.log("Reset token", resetToken);

  return { success: true };
}

export async function verifyAndResetPassword(token: any, newPassword: string) {
  const employer = await prisma.employer.findUnique({
    where: { resetToken: token },
  });

  if (!employer) {
    return { success: false, error: "Token not found" };
  }

  if (employer.resetTokenExpiry && new Date() > employer.resetTokenExpiry) {
    return { success: false, error: "Token expired" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatePassword = await prisma.employer.update({
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
    where: { id: employer.id },
  });

  return { success: true };
}
