import MenuLink from '@/constants/menu-link'
import { TOKEN_KEY } from '@/lib/user-token'
import { type NextRequest, NextResponse } from 'next/server'
import type { Middleware } from '.'

const protectedRoutes: string[] = [MenuLink.BUILDER_HOME]

function isProtected(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get(TOKEN_KEY)
  return protectedRoutes.includes(pathname) && !isAuthenticated
}

export function authMiddleware(middleware: Middleware) {
  return async (request: NextRequest) => {
    if (isProtected(request)) {
      return NextResponse.redirect(new URL(MenuLink.HOME, request.url))
    }
    return middleware(request)
  }
}
