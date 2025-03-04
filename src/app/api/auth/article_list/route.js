
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
  // 将新用户信息保存到数据库
  try {

    const result = await prisma.articles.findMany()
    return new Response(JSON.stringify({ message: "查询成功", result: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
