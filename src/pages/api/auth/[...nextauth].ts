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
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials ?? {};
    //     if (!email || !password) throw new Error("Missing credentials");

    //     let user = await prisma.user.findUnique({ where: { email } });

    //     if (!user) {
    //       user = await prisma.user.create({
    //         data: {
    //           email,
    //           name: 'unnamed',
    //           hashedPassword: await bcrypt.hash(password, 10)
    //         }
    //       });
    //       return { id: user.id, email: user.email };
    //     }

    //     if (!user.hashedPassword) throw new Error("Invalid credentials");

    //     const isValid = await bcrypt.compare(password, user.hashedPassword);
    //     if (!isValid) throw new Error("Invalid credentials");

    //     return { id: user.id, email: user.email };
    //   },
    // }),
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