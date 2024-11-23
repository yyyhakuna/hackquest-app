import { chain } from './middlewares'
import { authMiddleware } from './middlewares/auth'
import { pathnameMiddleware } from './middlewares/pathname'

export default chain([pathnameMiddleware, authMiddleware])

export const config = {
  matcher: ['/', '/((?!_next|_vercel|api|.*\\..*).*)'],
}
