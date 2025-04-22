import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic function to convert base64 to string
function decodeBase64(str: string): string {
  return Buffer.from(str, 'base64').toString()
}

// You can change these credentials - they will be hardcoded in the middleware
const USERNAME = 'orion'
const PASSWORD = 'orion2025'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = decodeBase64(authValue).split(':')

    if (user === USERNAME && pwd === PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Configure which paths will be protected
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 