// app/api/auth/login/route.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import {NextResponse} from 'next/server'

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Username and password are required" }), { status: 400 });
  }

  // 查找用户
  const [user] = await db.execute("SELECT * FROM Users WHERE username = ?", [username]);

  if (!user.length) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }

  const userData = user[0];

  // 比对密码
  const isPasswordValid = await bcrypt.compare(password, userData.password_hash);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
  }

  // 生成 JWT
  const token = jwt.sign(
    { userId: userData.id, username: userData.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 返回 JWT
  const response = NextResponse.json({ message: 'Cookie set' });
  
  // 设置cookie，name=auth_token，value=12345，路径为根目录，有效期为 1 小时
  response.cookies.set('token', token, {
    //httpOnly: false, // true防止客户端 JavaScript 访问此 cookie
    //secure: process.env.NODE_ENV === 'production', // 在生产环境下使用 https
    //sameSite: 'strict', // 防止跨站请求伪造 (CSRF)
    maxAge: 60 * 60, // 设置有效期为 1 小时
    path: '/', // 设置路径为根路径
  });

  return response;
  //return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
}
