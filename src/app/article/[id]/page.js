
import styles from "./page.module.css";
import Comment from "./Comment/Comment.js";
import ArticleContent from './components/ArticleContent';
import 'highlight.js/styles/atom-one-light.css'; 

export default async function Home({ params }) {

  const id = (await params).id;
 
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/article/' + id);
  const result = await res.json();

  // const comments = result.comments || [];
  // 模拟评论数据
 

  const { title, published_at, content } = result;
  const pdate = published_at.split('T')[0];

  // 评论添加
  const addComment = async (e) => {
    e.preventDefault();
    //调用api接口
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId: id,
        nickname: nickname,
        email: email,
        comment: comment,
      }),
    });


    // 刷新评论列表
    // getCommentList();
  }

  return (
    <div className={styles.page}>

      <div className={styles.main}>
        <h1>{title}</h1>
        <div className={styles.info}>{pdate}</div>
        <div className={styles.content}>
            <ArticleContent content={content} />
        </div>

        <div className={styles.overline}>
          <span>完</span>
        </div>

        {/* <div className={styles.actions}>
          <div className={styles.actionItem}>
            <div className={styles.actionCount}>45</div>
            <button className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </button>
          </div>
          <div className={styles.actionItem}>
            <div className={styles.actionCount}>56</div>
            <button className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
        </div> */}

        {/* 评论区 */}
        <div className={styles.commentSection}>
          

        {/* 评论组件传递id属性 */}
        <Comment articleId={id} />
        </div>
      </div>


    </div>
  );
}
