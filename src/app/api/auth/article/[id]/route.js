
import { db } from "@/lib/db";
import { NextResponse } from 'next/server'



export async function GET(req) {
  const url = new URL(req.url);
  console.log('url',url)
    const id = url.pathname.split('/').pop();
    console.log('id',id)
  // 将新用户信息保存到数据库
  try {
    const [rows] = await db.execute('SELECT * FROM articles where id='+id);
    return new Response(JSON.stringify(rows[0]), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
  }
}
