import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.companyName = (user as any).companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).companyName = token.companyName;

        if (token.role === "employer") {
          const employer = await prisma.employer.findUnique({
            where: { id: token.id as string },
            select: { name: true, companyName: true },
          });

          if (employer) {
            session.user.name = employer.name;
            (session.user as any).companyName = employer.companyName;
          }
          return session;
        }

        const profile = await prisma.detailInfo.findUnique({
          where: { userId: token.id as string },
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
    CredentialsProvider({
      name: "Employer login",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const employer = await prisma.employer.findUnique({
          where: { email: credentials.email },
        });

        if (!employer) return null;

        const validPassword = await bcrypt.compare(
          credentials.password,
          employer.password,
        );

        if (!validPassword) return null;

        return {
          id: employer.id,
          email: employer.email,
          companyName: employer.companyName,
          name: employer.name,
          role: "employer",
        };
      },
    }),
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
