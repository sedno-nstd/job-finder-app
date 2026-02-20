import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isCompleted?: boolean;
      role: string;
      phone?: string | null;
      companyName?: string;
    } & DefaultSession["user"];
  }
  interface User {
    role?: string;
  }
}
