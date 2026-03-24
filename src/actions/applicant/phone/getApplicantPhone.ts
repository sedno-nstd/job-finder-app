"use server";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { prisma } from "src/lib/prisma";
export async function FindApplicantPhone() {
  const user = await getServerSession(authConfig);

  if (!user) {
    return {
      success: false,
      error: true,
      message: "Faield to find user",
    };
  }

  const phone = await prisma.user.findUnique({
    where: { id: user.user.id },
    select: {
      phone: true,
    },
  });
  return phone;
}
