
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();


export async function GET(req) {
  // 将新用户信息保存到数据库
  console.log('prisma-----------------------------------',prisma)

  try {
    const result = await prisma.tags.findMany();
    return new Response(JSON.stringify({ message: "查询成功", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}


export async function POST(req) {
  const { tag,level,desc } = await req.json();
  // 将新用户信息保存到数据库
  

  try {
    const result = await prisma.tags.create({
      data: {
        name: tag,
        level,
        desc
      },
    })
    return new Response(JSON.stringify({ message: "add success", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
