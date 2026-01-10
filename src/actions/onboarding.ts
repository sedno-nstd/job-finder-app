"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";

export interface OnboardingData {
  role: string;
  firstName: string;
  lastName: string;

  gender: string;
  dateOfBirth: string;
  location: string;
  readyToRelocate: boolean;
  relocationLocations: string[];
  readyForWorkAbroad: boolean;

  desiredJob: string[];
  employmentType: string[];
  lastWorkplace: string;
  previousPosition: string;
  experienceDuration: string;
  searchMode: string;

  resumeUrl: string | null;
  continueWithoutResume: boolean;
}

export async function saveOnboardingData(data: OnboardingData) {
  const session = await getServerSession(authConfig);

  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "No user id" };

  try {
    const {
      continueWithoutResume,
      relocationLocations,
      desiredJob,
      employmentType,
      ...dbFields
    } = data;
    const userDetails = await prisma.detailInfo.upsert({
      where: { userId: userId },
      create: {
        userId: userId as string,
        ...dbFields,
        isCompleted: true,
        desiredJob: {
          create: desiredJob.map((name) => ({ name })),
        },
        relocationLocations: {
          create: relocationLocations.map((name) => ({ name })),
        },
        employmentType: {
          create: employmentType.map((name) => ({ name })),
        },
      },
      update: {
        ...dbFields,
        isCompleted: true,
        relocationLocations: {
          deleteMany: {},
          create: relocationLocations.map((name) => ({ name })),
        },
        desiredJob: {
          deleteMany: {},
          create: desiredJob.map((name) => ({ name })),
        },
        employmentType: {
          deleteMany: {},
          create: employmentType.map((name) => ({ name })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "DB Error" };
  }
}
