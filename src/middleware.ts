import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic function to convert base64 to string
function decodeBase64(str: string): string {
  return Buffer.from(str, 'base64').toString()
}

// You can change these credentials - they will be hardcoded in the middleware
const USERNAME = 'orion'
const PASSWORD = 'orionvibes'

export function middleware(request: NextRequest) {
  // Skip auth in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // Add a timestamp to prevent caching
  const timestamp = Date.now()
  
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = decodeBase64(authValue).split(':')

    if (user === USERNAME && pwd === PASSWORD) {
      // Create the response
      const response = NextResponse.next()
      
      // Add aggressive cache prevention headers
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '-1')
      response.headers.set('X-Auth-Timestamp', timestamp.toString())
      
      // Add Cloudflare-specific headers
      response.headers.set('CDN-Cache-Control', 'no-store')
      response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
      response.headers.set('Vary', '*')
      
      return response
    }
  }

  // Add cache control headers to the auth challenge response as well
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Secure Area", charset="UTF-8"`,
      'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'X-Auth-Timestamp': timestamp.toString(),
      'CDN-Cache-Control': 'no-store',
      'Cloudflare-CDN-Cache-Control': 'no-store',
      'Vary': '*'
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