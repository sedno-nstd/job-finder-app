import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      if (session.user && user.id) {
        (session.user as any).id = user.id;

        const profile = await prisma.detailInfo.findUnique({
          where: { userId: user.id },
          select: {
            firstName: true,
            lastName: true,
            isCompleted: true,
          },
        });
        if (profile) {
          session.user.name = `${profile.firstName} ${profile.lastName}`;
          session.user.isCompleted = profile.isCompleted;
        }
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
