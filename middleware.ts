import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function decodeBase64(str: string): string {
  return Buffer.from(str, 'base64').toString()
}

const USERNAME = 'orion'
const PASSWORD = 'orionvibes'

export function middleware(request: NextRequest) {
  // Remove development mode check to test if middleware is being executed
  
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = decodeBase64(authValue).split(':')

    if (user === USERNAME && pwd === PASSWORD) {
      const response = NextResponse.next()
      
      // Aggressive cache prevention
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '-1')
      response.headers.set('Surrogate-Control', 'no-store')
      response.headers.set('CDN-Cache-Control', 'no-store')
      response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store')
      response.headers.set('Vary', '*')
      
      return response
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Secure Area ${Date.now()}", charset="UTF-8"`,
      'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '-1',
      'Surrogate-Control': 'no-store',
      'CDN-Cache-Control': 'no-store',
      'Cloudflare-CDN-Cache-Control': 'no-store',
      'Vary': '*'
    },
  })
}

// More specific matcher configuration
export const config = {
  matcher: [
    // Match everything except static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 