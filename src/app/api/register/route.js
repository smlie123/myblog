// app/api/auth/register/route.js
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  // 检查用户名是否已存在
  const [existingUser] = await db.execute("SELECT * FROM users WHERE username = ? OR email = ?", [username, email]);
  if (existingUser.length > 0) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 将新用户信息保存到数据库
  try {
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return new Response(JSON.stringify({ message: "User registered successfully", userId: result.insertId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
