import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, credentials }) {
      // user is equivalent to session object, with an id
      console.log('user', user)
      // account stores provider info
      console.log('account', account)
      // may be useful for custom credentials
      console.log('credentials', credentials)

      // an account needs to be created on the DB
      if (account?.provider === 'google') {
        console.log('checking account')
        /**
         * check DB for google account
         * if account doesn't exist
         *  create account
         */
      }
      return true
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}

export default NextAuth(authOptions)
