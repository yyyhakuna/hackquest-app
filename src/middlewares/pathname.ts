import type { NextRequest } from 'next/server'
import type { Middleware } from '.'

export function pathnameMiddleware(middleware: Middleware) {
  return async (request: NextRequest) => {
    request.headers.append('x-pathname', request.nextUrl.pathname)
    return middleware(request)
  }
}
