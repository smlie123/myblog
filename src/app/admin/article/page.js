'use client'

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Button, Popconfirm, Table, Space, message } from 'antd';
import Link from 'next/link';
import { EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/article?sort=desc`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const sortedData = result.result.sort((a, b) => 
        new Date(b.published_at) - new Date(a.published_at)
      );
      setData(sortedData);
      setPagination(prev => ({
        ...prev,
        total: sortedData.length
      }));
    } catch (error) {
      setError(error.message);
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  }

  const deleteArticle = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/article/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      message.success('删除成功');
      fetchData(); // 重新加载列表
    } catch (error) {
      message.error('删除失败');
      setError(error.message);
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link href={'/article/' + record.id} target="_blank" className={styles.titleLink}>
          {text}
        </Link>
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'published_at',
      key: 'published_at',
      width: 200,
      render: (text) => new Date(text).toLocaleString('zh-CN')
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Link href={'/admin/article/edit?id=' + record.id}>
            <Button type="link" icon={<EditOutlined />}>
              编辑
            </Button>
          </Link>
          <Popconfirm
            title="确认删除"
            description="确定要删除这篇文章吗？"
            onConfirm={() => deleteArticle(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
          <Link href={'/article/' + record.id} target="_blank">
            <Button type="link" icon={<LinkOutlined />}>
              查看
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
