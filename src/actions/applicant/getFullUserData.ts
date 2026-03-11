"use server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { MainUserData, OnboardingData, UserProfile } from "@/src/types/user";
import { authConfig } from "@/src/config/auth";

export async function getFullUserData() {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const data = await prisma.detailInfo.findUnique({
      where: { userId: userId },
      include: {
        desiredJob: true,
        relocationLocations: true,
        employmentType: true,
      },
    });

    if (!data) return { success: false, error: "Not found" };

    const onBoarding: OnboardingData = {
      ...data,
      desiredJob: data.desiredJob.map((j) => j.name),
      relocationLocations: data.relocationLocations.map((l) => l.name),
      employmentType: data.employmentType.map((e) => e.name),
      continueWithoutResume: !!data.resumeUrl,
      readyForWorkAbroad: !!data.readyForWorkAbroad,
      readyToRelocate: !!data.readyToRelocate,
      resume: { name: "", size: "", url: data.resumeUrl || "" },
    };

    const userProfile: UserProfile = {
      ...data,
      customImage: data?.customImage || null,
      salaryAmount: data?.salaryAmount || undefined,
      salaryCurrency: data?.salaryCurrency || (null as any),
      salaryPeriod: data?.salaryPeriod || (null as any),
      aboutMe: data?.aboutMe || undefined,
    };

    return { success: true, data: { onBoarding, userProfile } as MainUserData };
  } catch (error) {
    return { success: false, error: "DB Error" };
  }
}
