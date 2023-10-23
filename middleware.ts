import { NextRequest, NextResponse } from 'next/server'

export const config = {
  // matcher: ['/', '/blog/:path*', '/about'],
  matcher: ['/none'],
}

export async function middleware(req: NextRequest) {
  try {
    const isInMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE

    if (isInMaintenanceMode == '1') {
      req.nextUrl.pathname = `/maintenance`

      return NextResponse.rewrite(req.nextUrl)
    }
  } catch (error) {
    console.error(error)
  }
}
