"use server";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function deleteVacancy(vacancyId: string) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    throw new Error("You must be logged in to delete a vacancy");
  }

  const currentUserId = (session.user as any).id;

  try {
    await prisma.vacancy.delete({
      where: { id: vacancyId, employerId: currentUserId },
    });

    revalidatePath("/employer");
    revalidatePath("/vacancies");

    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Could not delete vacancy. Are you the owner?",
    };
  }
}
