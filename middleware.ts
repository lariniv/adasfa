import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const at = request.cookies.get('_at');
  const rt = request.cookies.get('_at');

  if (at?.value && rt?.value) return NextResponse.next();

  try {
    if (rt?.value)
      axios.post('auth/refresh', { refreshToken: rt.value }).then((res) => {
        if (res.data.at) {
          request.cookies.set('_at', res.data.at);
          request.cookies.set('_rt', res.data.rt);
          return NextResponse.next();
        }
      });
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/platform', '/platform/:path*'],
};
