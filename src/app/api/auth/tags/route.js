
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function GET(req) {
  // 将新用户信息保存到数据库
  console.log('prisma-----------------------------------',prisma)

  try {
    const result = await prisma.tags.findMany();
    return new Response(JSON.stringify({ code:0, message: "查询成功", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}


export async function POST(req) {
  const { tag } = await req.json();
  // 将新用户信息保存到数据库
  try {
    const result = await prisma.tags.create({
      data: {
        name: tag
      },
    })
    return new Response(JSON.stringify({ code:0, message: "add success", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}


export async function DELETE(req) {
  const { id } = await req.json();
  // 将新用户信息保存到数据库
  try {
    const article = await prisma.tags.delete({
      where: {
        id: parseInt(id),
      },
    });
    return new Response(JSON.stringify({code:0,message:'delete success'}), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
