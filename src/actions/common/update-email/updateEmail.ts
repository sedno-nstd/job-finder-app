"use server";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@src/lib/prisma";

export const UpdateEmail = async (newEmail: string, userCode: string) => {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) throw new Error("You must be logged in");

    const storedToken = await prisma.verificationToken.findFirst({
      where: { target: newEmail, token: userCode, type: "Email" },
    });

    if (!storedToken || storedToken.token !== userCode) {
      return { success: false, error: "Wrond code" };
    }

    if (new Date(storedToken.expires) < new Date()) {
      return { success: false, error: "Time is up, try again" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        email: newEmail,
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.deleteMany({
      where: { token: userCode, userId: session.user.id },
    });

    return { success: true };
  } catch (err: any) {
    console.error("DATABASE_UPDATE_ERROR:", err);
    return { success: false, error: "Failed to update email" };
  }
};
