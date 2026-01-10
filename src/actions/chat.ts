"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function UserChats(userId: string) {
  if (!userId || userId === "undefined") {
    return [];
  }
  const userChats = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      conversations: {
        include: {
          users: true,
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });
  return userChats?.conversations || [];
}

export async function GetChatMessages(chatId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: chatId },
      include: {
        author: true,
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
  text: string
) {
  if (!text.trim()) return;
  try {
    await prisma.message.create({
      data: {
        chatId: chatId,
        text: text,
        authorId: authorId,
      },
    });
    revalidatePath("/chats");
  } catch {
    return [];
  }
}
