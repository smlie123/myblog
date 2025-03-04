
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

// 获取所有评论
export async function GET() {
  try {
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: 'desc'
      }
      
    });

    return NextResponse.json({
      code: 0,
      data: comments
    });
  } catch (error) {
    return NextResponse.json({
      code: 1,
      message: '获取评论列表失败'
    }, { status: 500 });
  }
}

// 更新评论状态（审核）
export async function PUT(req) {
  try {
    // 添加参数验证
    if (!req.body) {
      return NextResponse.json({
        code: 1,
        message: '请求参数不能为空'
      }, { status: 400 });
    }

    const params = await req.json();
    const { id, status } = params;
    console.log(id, status);

    // 验证必要参数
    if (!id || status === undefined) {
      return NextResponse.json({
        code: 1,
        message: '缺少必要参数'
      }, { status: 400 });
    }

    try {
      const comment = await prisma.comments.findUnique({
        where: { id: parseInt(id) },
      });
      if (!comment) {
        return NextResponse.json({
          code: 1,
          message: '评论不存在'
        }, { status: 404 });
      } 
      console.log(comment);     
      await prisma.comments.update({
        where: { id: parseInt(id) },
        data: { status: parseInt(status) }
      });
      return NextResponse.json({
        code: 0,
        message: '更新成功',
        data: comment
      });
    } catch (error) {
      console.error('更新评论状态失败:', error);
      return NextResponse.json({
        code: 1,
        message: '更新评论状态失败'
      }, { status: 500 });
    }

    const comment = await prisma.comments.update({
      where: { id: parseInt(id) },
      data: { status: parseInt(status) }
    });

    return NextResponse.json({
      code: 0,
      message: '更新成功',
      data: comment
    });
  } catch (error) {
    console.error('更新评论状态失败:', error);
    return NextResponse.json({
      code: 1,
      message: '更新评论状态失败'
    }, { status: 500 });
  }
}

// 删除评论
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        code: 1,
        message: '参数错误'
      }, { status: 400 });
    }

    await prisma.comments.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      code: 0,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除评论失败:', error);
    return NextResponse.json({
      code: 1,
      message: '删除评论失败'
    }, { status: 500 });
  }
}

