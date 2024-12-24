
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const url = request.url;
  const token = request.cookies.get('token');
  console.log('这里是全局中间件middleware，当前url-----------------',url)
  // 如果是访问 admin 路由，并且没有 token，则重定向到登录页面
  // if (url.includes('/admin') && !token) {
  //   return NextResponse.redirect(new URL('/login', url));
  // }

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more '/admin/:path*'
export const config = {
  matcher: ['/admin/:path*'],
}