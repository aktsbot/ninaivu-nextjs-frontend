import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { getUserFromDb } from '@/utils'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account && profile && account.provider === "google" && profile.email_verified) {
        const dbUser = await getUserFromDb({ email: profile.email! });
        if (!dbUser) {
          return false;
        }
        user.dbUser = dbUser;
        return true;
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
}

export default NextAuth(authOptions)

