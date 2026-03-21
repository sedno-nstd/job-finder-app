"use server";
import { prisma } from "@/src/lib/prisma";

export async function GetApplicantById(applicantId: string) {
  try {
    const data = await prisma.user.findUnique({
      where: { id: applicantId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        detailInfo: {
          include: {
            desiredJob: true,
            employmentType: true,
            relocationLocations: true,
          },
        },
      },
    });

    if (!data || !data.detailInfo) return null;

    return {
      ...data,
      detailInfo: {
        ...data.detailInfo,
        desiredJob: data.detailInfo.desiredJob.map((j) => j.name),
        jobType: data.detailInfo.employmentType.map((e) => e.name),
        relocationLocations: data.detailInfo.relocationLocations.map(
          (l) => l.name,
        ),
      },
    };
  } catch (error) {
    console.error("Error fetching applicant:", error);
    return null;
  }
}
