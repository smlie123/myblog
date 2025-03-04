
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req) {
    const { title, published_at,content, tags,category,summary,thumbnail } = await req.json();
    console.log('发布文章', title, content, tags,category)
    if (!title || !content) {
        return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }
    // 将新用户信息保存到数据库
    try {
        const article = await prisma.articles.create({
            data: {
                title,
                published_at: published_at ? new Date(published_at) : new Date(), // 修改这里：published_at -> published_at
                category,
                tags,
                content,
                summary,
                thumbnail
            },
        })
        return new Response(JSON.stringify({ message: "发布成功", articleId: article.id }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
    }
}

export async function PUT(req) {
    const { id, title, published_at, content, tags,category,summary } = await req.json();
    if (!title || !content) {
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
                published_at:published_at ? new Date(published_at):null,
                content,
                tags,
                category,
                summary
            },
        });
        return new Response(JSON.stringify({ message: "更新成功", articleId: article.id }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
    }
}

export async function GET(req) {

    try {
        const result = await prisma.articles.findMany({
        
           
            orderBy: {
              published_at: 'asc', // 或者 'desc'，根据需求排序
            },
            select: {
              id: true,
              title: true,
              published_at: true,
            },
          });

        

        
        // console.log('page',page)
        return new Response(JSON.stringify({ code:0, message: "查询成功",result }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
    }
}



