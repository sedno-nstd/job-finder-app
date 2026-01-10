import NextAuth from "next-auth";
import { authConfig } from "@/src/config/auth";

export const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
