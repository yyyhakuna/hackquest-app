import { routing } from '@/i18n/config'
import createMiddleware from 'next-intl/middleware'
import type { NextRequest, NextResponse } from 'next/server'

export type Middleware = (
  request: NextRequest,
) => Promise<NextResponse<unknown>> | NextResponse<unknown>

export type MiddlewareWrapper = (middleware: Middleware) => Middleware

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function chain(functions: Function[], index = 0) {
  const current = functions[index] // pathname
  if (current) {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    const next = chain(functions, index + 1) as Function
    return current(next)
  }
  return createMiddleware(routing)
}
