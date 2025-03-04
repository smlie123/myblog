
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const {url,method} = request;
  const token = request.cookies.get('token');
  
  // 如果是访问 admin 路由，并且没有 token，则重定向到登录页面
  if (url.includes('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', url));
  }

  //如果没有身份，无法访问接口
  if (url.includes('/auth') && !token && ['PUT,POST,DELETE'].includes(method)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*','/api/auth/:path*'],
}