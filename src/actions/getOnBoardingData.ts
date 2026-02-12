"use server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authConfig } from "../config/auth";
import { OnboardingData } from "../types/user";

export async function getOnboardingData() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const data = await prisma.detailInfo.findUnique({
      where: { userId },
      include: {
        desiredJob: true,
        relocationLocations: true,
        employmentType: true,
      },
    });

    if (!data) return { success: false, error: "Not found" };

    const mappedData: OnboardingData = {
      ...data,
      desiredJob: data.desiredJob.map((j) => j.name),
      relocationLocations: data.relocationLocations.map((l) => l.name),
      employmentType: data.employmentType.map((e) => e.name),
      continueWithoutResume: !!data.resumeUrl,
      location: data.location,
      searchMode: data.searchMode,
      readyForWorkAbroad: !!data.readyForWorkAbroad,
      readyToRelocate: !!data.readyToRelocate,
      dateOfBirth: data.dateOfBirth,
      experienceDuration: data.experienceDuration,
      firstName: data.firstName,
      gender: data.gender,
      lastName: data.lastName,
      lastWorkplace: data.lastWorkplace,
      previousPosition: data.previousPosition,
      resume: {
        name: "",
        size: "",
        url: data.resumeUrl,
      },
      role: data.role,
    };

    return { success: true, data: mappedData };
  } catch (error) {
    return { success: false, error: "DB Error" };
  }
}
