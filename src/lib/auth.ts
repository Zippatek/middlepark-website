/**
 * MIDDLEPARK PROPERTIES — NEXTAUTH CONFIGURATION
 * ================================================
 * NextAuth v5 configuration with Credentials provider.
 * This is a placeholder config — wire up your database
 * and OAuth providers in production.
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with actual database lookup
        // This is a demo placeholder for development
        if (
          credentials?.email === 'demo@middleparkng.com' &&
          credentials?.password === 'Demo1234'
        ) {
          return {
            id: '1',
            name: 'Aisha Bello',
            email: 'demo@middleparkng.com',
            image: '/images/avatar-default.jpg',
          }
        }
        return null
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
        return false // Redirect to login
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'middlepark-dev-secret-change-in-production',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
