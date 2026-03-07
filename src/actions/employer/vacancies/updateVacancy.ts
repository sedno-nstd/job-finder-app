"use server";
import { authConfig } from "@/src/config/auth";
import { Vacancy } from "@/src/config/types";
import { getServerSession } from "next-auth";

interface UpdateVacancyProps extends Partial<Vacancy> {
  id: string;
}

export async function updateVacancy(payload: UpdateVacancyProps) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return {
      success: false,
    };
  }
  const { id, employerId, postedAt, ...updateData } = payload;

  try {
    const vacancy = await prisma?.vacancy.update({
      where: { id: id },
      data: {
        ...updateData,
        stack: Array.isArray(payload.stack)
          ? payload.stack?.join(", ")
          : payload.stack,
        level: Array.isArray(payload.level)
          ? payload.level?.join(", ")
          : payload.level,
      },
    });
    return { success: true, data: vacancy };
  } catch (err) {
    console.error("Update Error:", err);
    return { success: false };
  }
}
