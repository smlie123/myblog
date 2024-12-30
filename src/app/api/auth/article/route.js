
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req) {
    const { title, content, tags,category,summary,thumbnail } = await req.json();
    console.log('发布文章', title, content, tags,category)
    if (!title || !content) {
        return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }
    // 将新用户信息保存到数据库
    try {
        const article = await prisma.articles.create({
            data: {
                title,
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
    const { id, title, content, tags,category,summary } = await req.json();
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
    

    const searchParams = req.nextUrl.searchParams;
    const currentPage = searchParams.get('currentPage')
    const pageSize = searchParams.get('pageSize')
    const category = searchParams.get('category')

    const where = category ? 'WHERE category = $1' : ''; 
   
    try {
        console.log('pageSize',pageSize)
        const skip = (currentPage - 1) * pageSize; // 计算跳过的条数
        const take = parseInt(pageSize);   // 每页条数

        console.log('category=====',category)


        const totalRecords = await prisma.articles.count({
            where: {
                category:category ? category : undefined
              }
        }); //总数
        const totalPages = Math.ceil(totalRecords/pageSize); //总页数

        

        const result = await prisma.articles.findMany({
            where: {
              category: category ? category : undefined, // 如果有 category，则根据其查询
            },
            skip: skip,
            take: take,
            orderBy: {
              published_at: 'asc', // 或者 'desc'，根据需求排序
            },
            select: {
              id: true,
              title: true,
              summary: true,
              tags: true,
              thumbnail: true,
              published_at: true,
            },
          });

        console.log('-----result',totalRecords,totalPages)
        console.log(result)
        const page = {
            currentPage,
            pageSize,
            totalPages,
            totalRecords
        }
        console.log('page',page)
        return new Response(JSON.stringify({ code:0, message: "查询成功", result, page }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Database error", error }), { status: 500 });
    }
}



