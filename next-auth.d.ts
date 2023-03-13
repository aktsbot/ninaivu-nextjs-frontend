import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Profile {
    email_verified: boolean
  }

  // TODO: fix this
  interface User {
    dbUser: any
  }
}
