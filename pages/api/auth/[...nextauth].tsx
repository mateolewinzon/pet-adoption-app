import NextAuth, {
 getServerSession,
  NextAuthOptions,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
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
  },
};
export default NextAuth(authOptions);

export const getUser = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
  res: ServerResponse,
  includePets: boolean = false
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: { pets: { include: { images: includePets } } },
  });

  return user;
};
