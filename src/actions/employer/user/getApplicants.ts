"use server";
import { authConfig } from "@/src/config/auth";
import { ApplicantResponse } from "@/src/types/user";
import { getServerSession } from "next-auth";
import { prisma } from "src/lib/prisma";
export async function GetApplicants(vacancyId: string) {
  const session = await getServerSession(authConfig);
  const myId = session?.user.id;

  if (!myId) {
    return {
      success: false,
      error: true,
      message: "Not authorize",
    };
  }

  const data = await prisma.vacancy.findFirst({
    where: {
      id: vacancyId,
      employerId: myId,
    },
    select: {
      title: true,
      application: {
        include: {
          applicant: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              detailInfo: {
                include: {
                  desiredJob: true,
                  employmentType: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!data) return [];

  const formattedData: ApplicantResponse[] = data.application.map((app) => {
    const info = app.applicant.detailInfo;

    return {
      ...app,
      applicant: {
        ...app.applicant,
        detailInfo: info
          ? {
              ...info,
              desiredJob: info.desiredJob.map((job) => job.name),
              jobType: info.employmentType.map((type) => type.name),
            }
          : null,
      },
    };
  });

  return formattedData;
}
