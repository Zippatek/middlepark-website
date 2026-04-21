/**
 * NextAuth v5 — Route handler
 * Exposes GET /api/auth/* and POST /api/auth/*
 */
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
