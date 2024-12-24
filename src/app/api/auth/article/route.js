
import { db } from "@/lib/db";
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { title, content } = await req.json();
  console.log('发布文章',title,content)
  if (!title || !content ) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  

  // 将新用户信息保存到数据库
  try {
    const [result] = await db.execute(
      "INSERT INTO articles (title, content) VALUES (?, ?)",
      [title, content]
    );
    return new Response(JSON.stringify({ message: "发布成功", articleId: result.insertId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}

export async function GET(req) {
  // 将新用户信息保存到数据库
  try {
    const [result] = await db.execute(
      "SELECT * FROM articles"
    );
    return new Response(JSON.stringify({ message: "查询成功", result: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
