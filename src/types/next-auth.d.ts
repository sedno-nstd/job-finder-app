import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isCompleted: boolean;
      phone?: string | null;
    } & DefaultSession["user"];
  }
}
