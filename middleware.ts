import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from './lib/helper';

const isGuestRoute = (pathname: string) => {
  return pathname === "/login";
};
 
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isGuestRoute(pathname) && getToken()) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isGuestRoute(pathname) && !getToken()) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
