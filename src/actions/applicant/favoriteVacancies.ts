"use server";
import { authConfig } from "@/src/config/auth";
import { prisma } from "src/lib/prisma";
import { getServerSession } from "next-auth";

export async function AddFavoriteVacancies(vacancyId: string) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return { success: false, error: "Not logged in" };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { favoriteVacancies: true },
    });

    const isCurrentlyFavorite = user?.favoriteVacancies.some(
      (v) => v.id === vacancyId,
    );

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        favoriteVacancies: isCurrentlyFavorite
          ? { disconnect: { id: vacancyId } }
          : { connect: { id: vacancyId } },
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Failed to add in the favorite", error);
    return { success: false, error: "Database error" };
  }
}

export async function CheckFavoriteVacancy() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return { success: false, error: "Not logged in" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      favoriteVacancies: true,
    },
  });

  return {
    success: true,
    vacancies: user?.favoriteVacancies || [],
  };
}
