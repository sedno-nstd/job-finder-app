"use server";
import { prisma } from "src/lib/prisma";
import bcrypt from "bcrypt";

export async function CreateApplicant(
  userEmail: string,
  userPassword: string,
  userName: string,
) {
  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const applicant = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: userEmail,
        name: userName,
      },
    });

    return {
      success: true,
      data: applicant,
    };
  } catch (err: any) {
    return {
      success: false,
      error: true,
      message:
        err.code === "P2002"
          ? "Email already exists"
          : "Failed to create account",
    };
  }
}

export async function FindApplicant(userEmail: string, userPassword: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}
