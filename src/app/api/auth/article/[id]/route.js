
//import { db } from "@/lib/db";
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET(req) {
  const url = new URL(req.url);
  console.log('url',url)
    const id = url.pathname.split('/').pop();
    console.log('id',id)
  // 将新用户信息保存到数据库
  try {
    //const [rows] = await db.execute('SELECT * FROM articles where id='+id);
    //const result = await prisma.articles.findMany();
    const article = await prisma.articles.findUnique({
      where: {
        id:parseInt(id)
      },
    })
    return new Response(JSON.stringify(article), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}

export async function DELETE(req) {
  const url = new URL(req.url);
  console.log('url',url)
    const id = url.pathname.split('/').pop();
    console.log('id',id)
  // 将新用户信息保存到数据库
  try {
    //const [rows] = await db.execute('SELECT * FROM articles where id='+id);
    //const result = await prisma.articles.findMany();
    const article = await prisma.articles.delete({
      where: {
        id: parseInt(id),
      },
    });
    return new Response(JSON.stringify({code:0,message:'delete success'}), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}

