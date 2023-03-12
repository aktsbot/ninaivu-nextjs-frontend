import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

// import { isEmailInAllowedList } from '@/utils'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

