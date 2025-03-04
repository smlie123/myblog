'use client';
import { useRef, useState,useEffect} from 'react';
import styles from "./page.module.css";

export default function Comment({ articleId }) {  // 直接从props中解构articleId
    const [commentText, setCommentText] = useState('');
    const nicknameRef = useRef('');
    const emailRef = useRef('');
    // 添加消息提示状态
    const [message, setMessage] = useState({ show: false, text: '', type: '' });

    // 显示消息提示
    const showMessage = (text, type = 'success') => {
        setMessage({ show: true, text, type });
        // 3秒后自动隐藏
        setTimeout(() => {
            setMessage({ show: false, text: '', type: '' });
        }, 3000);
    };

    const addComment = async () => {
        // 评论提交逻辑
        const comment = commentText;
        const nickname = nicknameRef.current.value;
        const email = emailRef.current.value;

        if (!comment || !nickname || !email) {
            alert('请填写完整信息');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    nickname,
                    email,
                    articleId
                }),
            });

            if (response.ok) {
                setCommentText('');
                nicknameRef.current.value = '';
                emailRef.current.value = '';
                // 增加一个弹窗提示
                // alert('评论成功');
                showMessage('评论提交成功，等待审核');

            } else {
                alert('评论失败');
            }
        } catch (error) {
            console.error('提交评论失败:', error);
        }
    };

    // 从接口获取评论
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?articleId=${articleId}`);
            const res = await response.json();
            if (res.code === 0) {
                setComments(res.data);
            }
            
        } catch (error) {
            console.error('获取评论失败:', error);
        }
    };      

    // 组件挂载时获取评论
    useEffect(() => {
        fetchComments();
    }, [articleId]); // 当articleId变化时重新获取评论   

    return (
        <div className={styles.comment}>
            <h3 className={styles.commentTitle}>评论</h3>

            {/* 评论列表 */}
            <div className={styles.commentList}>
                {comments?.map(comment => (
                    <div key={comment.id} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{comment.nickname}</span>
                            <span className={styles.commentDate}>
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className={styles.commentContent}>{comment.content}</div>
                    </div>
                ))}
            </div>

            {/* 评论表单 */}
            <div className={styles.commentForm}>
                <h4>发表评论</h4>
                <div className={styles.formGroup}>
                    <textarea
                        className={styles.textarea}
                        placeholder="写下你的评论..."
                        rows={4}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="昵称"
                            ref={nicknameRef}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="邮箱"
                            ref={emailRef}
                        />
                    </div>
                </div>
                <button className={styles.submitButton} onClick={addComment}>提交评论</button>
            </div>

            {/* 消息提示组件 */}
            {message.show && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}