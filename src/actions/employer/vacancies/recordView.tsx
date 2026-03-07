"use server";
import { headers } from "next/headers";
import { prisma } from "@/src/lib/prisma";

export async function recordView(vacancyId: string) {
  const headerList = headers();
  const ip = (await headerList).get("x-forwarded-for") || "unknown";

  try {
    await prisma.viewLog.create({
      data: {
        vacancyId: vacancyId,
        userIp: ip,
      },
    });
    await prisma.vacancy.update({
      where: { id: vacancyId },
      data: { views: { increment: 1 } },
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Already viewed" };
  }
}
