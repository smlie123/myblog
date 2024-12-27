
// import { db } from "@/lib/db";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req) {
  const { title, content } = await req.json();
  console.log('发布文章',title,content)
  if (!title || !content ) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }
  // 将新用户信息保存到数据库
  try {
    // const [result] = await db.execute(
    //   "INSERT INTO articles (title, content) VALUES (?, ?)",
    //   [title, content]
    // );
    const article = await prisma.articles.create({
      data: {
        title: title,
        content: content,
      },
    })
    return new Response(JSON.stringify({ message: "发布成功", articleId: article.id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id,title, content } = await req.json();
  console.log('更新文章',title,content)
  if (!title || !content ) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }
  // 将新用户信息保存到数据库
  try {

    const article = await prisma.articles.update({
      where: {
        id: parseInt(id), 
      },
      data: {
        title,
        content
      },
    });
    return new Response(JSON.stringify({ message: "更新成功", articleId: article.id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}

export async function GET(req) {
  // 将新用户信息保存到数据库
  try {
    // const [result] = await db.execute(
    //   "SELECT * FROM articles"
    // );
    const result = await prisma.articles.findMany();
    return new Response(JSON.stringify({ message: "查询成功", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
