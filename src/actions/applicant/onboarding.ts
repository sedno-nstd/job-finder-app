"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";
import { MainUserData } from "@/src/types/user";
import { onboardingDbSchema } from "@/src/components/onboarding/schemas/schemas";

const syncRelations = (arr: string[] = []) => ({
  deleteMany: {},
  create: arr.map((name) => ({ name })),
});

export async function saveOnboardingData(fullData: MainUserData) {
  const session = await getServerSession(authConfig);

  const userId = session?.user?.id;

  if (!userId) return { success: false, error: "No user id" };

  const { onBoarding, userProfile } = fullData;

  const finalDetailData = onboardingDbSchema.parse({
    ...onBoarding,
    ...userProfile,
    resumeUrl: onBoarding.resume?.url || null,
    isCompleted: true,
    role: "applicant",
  });

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        phone: userProfile.phone,
        detailInfo: {
          upsert: {
            update: {
              ...finalDetailData,
              relocationLocations: syncRelations(
                onBoarding.relocationLocations,
              ),
              desiredJob: syncRelations(onBoarding.desiredJob),
              employmentType: syncRelations(onBoarding.employmentType),
            },
            create: {
              ...finalDetailData,
              relocationLocations: {
                create: onBoarding.relocationLocations.map((name) => ({
                  name,
                })),
              },
              desiredJob: {
                create: onBoarding.desiredJob.map((name) => ({ name })),
              },
              employmentType: {
                create: onBoarding.employmentType.map((name) => ({ name })),
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
  return { success: true };
}
