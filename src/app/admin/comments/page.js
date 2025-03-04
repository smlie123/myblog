'use client'
import { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Tag } from 'antd';
import styles from './page.module.css';

export default function CommentsManagement() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取评论列表
  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/comments`);
      const data = await res.json();
      if (data.code === 0) {
        setComments(data.data);
      }
    } catch (error) {
      message.error('获取评论列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 更新评论状态
const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: parseInt(id),
          status: parseInt(status) 
        }),
      });
      
      const data = await res.json();
      if (data.code === 0) {
        message.success('操作成功');
        fetchComments();
      } else {
        message.error(data.message || '操作失败');
      }
    } catch (error) {
      message.error('操作失败');
    }
};

  // 删除评论
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/comments`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        message.success('删除成功');
        fetchComments();
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
      width: '30%',
    },
    {
      title: '评论人',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '评论时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          0: { text: '待审核', color: 'warning' },
          1: { text: '已通过', color: 'success' },
          2: { text: '已拒绝', color: 'error' },
        };
        const { text, color } = statusMap[status] || {};
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div className={styles.actionButtons}>
          <>
              <Button 
                type="link" 
                onClick={() => handleUpdateStatus(record.id, 1)}
              >
                通过
              </Button>
              <Button 
                type="link" 
                danger 
                onClick={() => handleUpdateStatus(record.id, 2)}
              >
                拒绝
              </Button>
            
          <Popconfirm
            title="确定要删除这条评论吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
          </>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className={styles.container}>
      <h2>评论管理</h2>
      <Table
        columns={columns}
        dataSource={comments}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条评论`,
        }}
      />
    </div>
  );
}