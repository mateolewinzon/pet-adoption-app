import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: PrismaUser & DefaultSession["user"];
  }
  interface User extends DefaultUser, PrismaUser {}
}
