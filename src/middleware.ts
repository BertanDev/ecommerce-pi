import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const signInURL = new URL('/', request.url)
  const dashboardURL = new URL('/products', request.url)

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }

    if (request.nextUrl.pathname === '/create-account') {
      return NextResponse.next()
    }

    return NextResponse.redirect(signInURL)
  }

  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/create-account'
  ) {
    return NextResponse.redirect(dashboardURL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/products',
    '/shop-cart',
    '/user-profile',
    '/payment',
    '/course-detail',
    '/create-account',
  ],
}
