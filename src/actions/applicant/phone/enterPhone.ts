"use server";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import z from "zod";

const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format");

export async function EnterPhone(newPhone: string) {
  const session = await getServerSession(authConfig);

  console.log("Server Session:", session);

  if (!session?.user.id) throw new Error("Unauthorized");

  const existPhone = await prisma?.user.findUnique({
    where: { phone: newPhone },
  });

  if (existPhone) {
    return { success: false, error: "This phone already own" };
  }

  const validation = phoneSchema.safeParse(newPhone);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 3600000);

  try {
    await prisma?.verificationToken.deleteMany({
      where: { target: newPhone, type: "Phone", userId: session.user.id },
    });
    await prisma?.verificationToken.create({
      data: {
        expires: expires,
        target: newPhone,
        token: otpCode,
        type: "Phone",
        userId: session.user.id,
      },
    });

    console.log(`[SMS] Code for ${newPhone}: ${otpCode}`);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal server error. Try again later." };
  }
}
