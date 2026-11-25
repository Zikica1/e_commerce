import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  //  1. nema token → login
  if (!token) {
    const from = request.nextUrl.pathname + request.nextUrl.search;

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url),
    );
  }

  // ✔ sve OK → nastavi
  return NextResponse.next();
}

//mora ovde, bez njega bi se pokrenuo na svim rutama
export const config = {
  matcher: ['/admin/:path*'],
};
