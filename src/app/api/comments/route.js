import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { content, nickname, email, articleId } = await req.json();

        // 验证必填字段
        if (!content || !nickname || !email || !articleId) {
            return NextResponse.json({
                code: 1,
                message: '请填写完整信息'
            }, { status: 400 });
        }

        // 创建评论
        const comment = await prisma.comments.create({
            data: {
                content,
                nickname,
                email,
                articleId: parseInt(articleId)
            }
        });

        return NextResponse.json({
            code: 0,
            message: '评论成功',
            data: comment
        }, { status: 201 });

    } catch (error) {
        console.error('创建评论失败:', error);
        return NextResponse.json({
            code: 1,
            message: '评论创建失败'
        }, { status: 500 });
    }
}

// 获取评论列表
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const articleId = searchParams.get('articleId');

        if (!articleId) {
            return NextResponse.json({
                code: 1,
                message: '文章ID不能为空'
            }, { status: 400 });
        }

        const comments = await prisma.comments.findMany({
            where: {
                articleId: parseInt(articleId),
                status:1
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            code: 0,
            data: comments
        });

    } catch (error) {
        console.error('获取评论列表失败:', error);
        return NextResponse.json({
            code: 1,
            message: '获取评论列表失败'
        }, { status: 500 });
    }
}