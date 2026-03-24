"use server";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@src/lib/prisma";
import { Resend } from "resend";

export const RequestEmailUpdate = async (newEmail: string) => {
  const request = new Resend(process.env.RESEND_API_KEY);

  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) throw new Error("You must be logged in");

    const existEmail = await prisma?.user.findUnique({
      where: { email: newEmail },
    });

    if (existEmail) {
      return { success: false, error: "This email is already busy" };
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 3600000);

    await prisma.$transaction([
      prisma.verificationToken.deleteMany({
        where: { target: newEmail, type: "Email" },
      }),
      prisma.verificationToken.create({
        data: {
          type: "Email",
          target: newEmail,
          token: otpCode,
          expires: expiresAt,
          userId: session.user.id,
        },
      }),
    ]);

    await request.emails.send({
      to: newEmail,
      from: "info@yourdomain.com",
      subject: "Confirm your new email",
      html: `
        <h1>Email Confirmation</h1>
        <p>Your confirmation code is: <strong>${otpCode}</strong></p>
        <p>This code expires in 1 hour.</p>
      `,
    });

    return { success: true };
  } catch (err: any) {
    console.error("DATABASE_UPDATE_ERROR:", err);

    if (err.code === "P2002") {
      return { success: false, error: "This email is already in use" };
    }

    return { success: false, error: "Failed to update email" };
  }
};
