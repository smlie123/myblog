'use client'
import { useState, useEffect } from "react";
import { Input, Button, Card, Table, Space, message, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from "./page.module.css";

export default function TagManagement() {
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentTag, setCurrentTag] = useState(null);

    // 获取标签列表
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/tags`);
            if (!response.ok) throw new Error('获取标签失败');
            const data = await response.json();
            setTags(data.result || []);
        } catch (error) {
            message.error('获取标签列表失败');
        } finally {
            setLoading(false);
        }
    };

    // 添加标签
    const handleAddTag = async () => {
        if (!tag.trim()) {
            message.warning('请输入标签名称');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/tags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag }),
            });
            const data = await response.json();
            
            if (data.code === 0) {
                message.success('添加成功');
                setTag('');
                fetchTags();
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            message.error('添加失败');
        }
    };

    // 编辑标签
    const handleEdit = (record) => {
        setCurrentTag(record);
        setTag(record.name);
        setEditModalVisible(true);
    };

    const handleUpdateTag = async () => {
        if (!tag.trim()) {
            message.warning('请输入标签名称');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/tags`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentTag.id, name: tag }),
            });
            const data = await response.json();

            if (data.code === 0) {
                message.success('更新成功');
                setEditModalVisible(false);
                setTag('');
                fetchTags();
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            message.error('更新失败');
        }
    };

    // 删除标签
    const handleDelete = async (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除标签"${record.name}"吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/tags`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: record.id }),
                    });
                    const data = await response.json();

                    if (data.code === 0) {
                        message.success('删除成功');
                        fetchTags();
                    } else {
                        throw new Error(data.message);
                    }
                } catch (error) {
                    message.error('删除失败');
                }
            },
        });
    };

    // 表格列配置
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="link" 
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        编辑
                    </Button>
                    <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className={styles.container}>
            <Card
                title="标签管理"
                extra={
                    <Space>
                        <Input
                            placeholder="请输入标签名称"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onPressEnter={handleAddTag}
                            style={{ width: 200 }}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddTag}
                        >
                            添加
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={tags}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                />
            </Card>

            <Modal
                title="编辑标签"
                open={editModalVisible}
                onOk={handleUpdateTag}
                onCancel={() => {
                    setEditModalVisible(false);
                    setTag('');
                }}
                okText="确定"
                cancelText="取消"
            >
                <Input
                    placeholder="请输入标签名称"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </Modal>
        </div>
    );
}