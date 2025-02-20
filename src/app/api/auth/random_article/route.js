
// import { db } from "@/lib/db";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export async function GET(req) {
  // 将新用户信息保存到数据库
  try {

    const result = await prisma.$queryRaw`
    SELECT id, title, summary, tags, thumbnail, SUBSTRING(published_at, 1, 10) AS published_at
    FROM Articles ORDER BY RAND() LIMIT 20
    `;
    return new Response(JSON.stringify({ message: "查询成功", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
