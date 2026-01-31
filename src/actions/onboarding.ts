"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";
import { MainUserData } from "../types/user";

const mapCreate = (arr: string[]) => ({
  create: arr.map((name) => ({ name })) || [],
});

const mapUpdate = (arr: string[]) => ({
  deleteMany: {},
  create: arr.map((name) => ({ name })) || [],
});

export async function saveOnboardingData(fullData: MainUserData) {
  const session = await getServerSession(authConfig);

  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "No user id" };

  const { onBoarding, userProfile } = fullData;

  const {
    continueWithoutResume,
    relocationLocations,
    desiredJob,
    employmentType,
    ...cleanOnBoarding
  } = onBoarding;

  const finalFields = {
    ...cleanOnBoarding,
    ...userProfile,
  };

  try {
    await prisma.detailInfo.upsert({
      where: { userId },
      update: {
        ...finalFields,
        isCompleted: true,
        relocationLocations: mapUpdate(relocationLocations),
        desiredJob: mapUpdate(desiredJob),
        employmentType: mapUpdate(employmentType),
      },
      create: {
        userId,
        ...finalFields,
        isCompleted: true,
        relocationLocations: mapCreate(relocationLocations),
        desiredJob: mapCreate(desiredJob),
        employmentType: mapCreate(employmentType),
      },
    });
  } catch (error: any) {
    console.error("CRITICAL_DB_ERROR:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
