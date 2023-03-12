import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { isEmailInAllowedList } from '@/utils'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile && account.provider === "google") {
        return profile.email_verified && isEmailInAllowedList({ email: profile.email! })
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
}

export default NextAuth(authOptions)

