"use server";
import { prisma } from "@/lib/prisma";

export async function UserChats(userId: string) {
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
