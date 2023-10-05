import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/', '/blog/:path*', '/about'],
}

export async function middleware(req: NextRequest) {
  try {
    const isInMaintenanceMode = process.env.MAINTENANCE_MODE

    if (isInMaintenanceMode) {
      req.nextUrl.pathname = `/maintenance`

      return NextResponse.rewrite(req.nextUrl)
    }
  } catch (error) {
    console.error(error)
  }
}
