'use client'
import React from 'react';
import { Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {
  FileAddOutlined,
  FileTextOutlined,
  FolderOutlined,
  TagsOutlined,
  DeleteOutlined,
  CommentOutlined,
  LockOutlined
} from '@ant-design/icons';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      key: 'content',
      label: '内容管理',
      children: [
        {
          key: '/admin/article/edit',
          icon: <FileAddOutlined />,
          label: '新建文章'
        },
        {
          key: '/admin/article',
          icon: <FileTextOutlined />,
          label: '文章列表'
        },
        {
          key: '/admin/tags',
          icon: <TagsOutlined />,
          label: '标签管理'
        },
        {
          key: '/admin/recycle',
          icon: <DeleteOutlined />,
          label: '回收站'
        }
      ]
    },
    {
      key: 'comments',
      label: '评论管理',
      
      children: [
        {
          key: '/admin/comments',
          icon: <CommentOutlined />,
          label: '评论列表'
        }
      ]
    },
    {
      key: 'system',
      label: '系统设置',
      children: [
        {
          key: '/admin/password',
          icon: <LockOutlined />,
          label: '修改密码'
        }
      ]
    }
  ];

  const handleMenuClick = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['content']}
      selectedKeys={[pathname]}
      items={items}
      onClick={handleMenuClick}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
}