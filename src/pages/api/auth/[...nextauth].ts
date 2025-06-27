import { prisma } from "@/server/utils/prisma";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials ?? {};
      
          if (!email || !password) {
            return null;
          }
      
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user?.hashedPassword) return null;
      
          const isValid = await bcrypt.compare(password, user.hashedPassword);
          if (!isValid) return null;
      
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("AUTH ERROR in authorize()", error);
          return null;
        }
      }      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.sub!;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);