"use server";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/src/config/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function UserChats(userId: string) {
  if (!userId || userId === "undefined") return [];

  const chats = await prisma.conversation.findMany({
    where: {
      OR: [{ employerId: userId }, { userId: userId }],
    },
    include: {
      employer: true,
      user: {
        include: {
          detailInfo: true,
        },
      },
      vacancy: {
        select: { title: true },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  return chats || [];
}

export async function CreateChat(applicantId: string, vacancyId: string) {
  try {
    const session = await getServerSession(authConfig);
    const employerId = (session?.user as any)?.id;

    if (!employerId) return { error: "Not authorized" };

    const existConversation = await prisma.conversation.findFirst({
      where: {
        vacancyId: vacancyId,
        employerId: employerId,
        userId: applicantId,
      },
    });

    if (existConversation) {
      return { success: true, chatId: existConversation.id };
    }

    const newConversation = await prisma.conversation.create({
      data: {
        vacancyId: vacancyId,
        employerId: employerId,
        userId: applicantId,
      },
    });

    return { success: true, chatId: newConversation.id };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function GetChatMessages(chatId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: chatId },
      include: {
        authorUser: true,
        authorEmployer: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch {
    return [];
  }
}

export async function createMessage(
  chatId: string,
  authorId: string,
  text: string,
  role: "employer" | "applicant",
) {
  if (!text.trim()) return;
  try {
    await prisma.message.create({
      data: {
        chatId: chatId,
        text: text,
        authorEmployerId: role === "employer" ? authorId : null,
        authorUserId: role === "applicant" ? authorId : null,
      },
    });
    revalidatePath("/chats");
  } catch {
    return [];
  }
}

export async function RespondCreate(myId: string, vacancyId: string) {
  return await prisma.$transaction(async (tx) => {
    const vacancy = await tx.vacancy.findUnique({
      where: { id: vacancyId },
    });

    if (!vacancy?.id) throw new Error("Vacancy not found");

    const application = await tx.application.create({
      data: {
        vacancyId: vacancy.id,
        applicantId: myId,
        status: "pending",
      },
    });
    return { success: true, applicationId: application.id };
  });
}
