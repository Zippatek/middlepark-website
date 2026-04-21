/**
 * MIDDLEPARK PROPERTIES — NEXTAUTH CONFIGURATION
 * ================================================
 * Credentials provider wired to the live backend API.
 * The backend's accessToken is stored in the JWT and exposed
 * on the session so portal pages can make authenticated calls.
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { loginUser } from './api'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const res = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          })

          if (!res.success || !res.data) return null

          const { id, firstName, lastName, email, accessToken, refreshToken } = res.data

          return {
            id,
            name: `${firstName} ${lastName}`,
            email,
            // Store tokens in the user object so JWT callback can access them
            accessToken,
            refreshToken,
          }
        } catch {
          // Invalid credentials or network error — NextAuth shows error page
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    newUser: '/register',
    error: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPortal = nextUrl.pathname.startsWith('/portal')

      if (isPortal) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to /login
      }

      return true
    },

    // Persist backend tokens in the JWT cookie
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // These come from the authorize() return above
        token.accessToken = (user as any).accessToken
        token.refreshToken = (user as any).refreshToken
      }
      return token
    },

    // Expose accessToken on the session so pages can use it for API calls
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session as any).accessToken = token.accessToken
      }
      return session
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET || 'middlepark-website-nextauth-secret-2026',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
