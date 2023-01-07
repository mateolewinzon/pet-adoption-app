import NextAuth, {
  NextAuthOptions,
  unstable_getServerSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "lib/prisma";
import type { IncomingMessage, ServerResponse } from "http";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  theme: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Paw-print.svg/1200px-Paw-print.svg.png",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  }
};
export default NextAuth(authOptions);

export const getUser = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
  res: ServerResponse
) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  return user;
};
