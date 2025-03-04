//首页
import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// 添加这一行来禁用缓存
export const revalidate = 0;  // 0 表示禁用缓存
export default async function Home() {
    const skip = 0;
    const take = 20;
    
    const result = await prisma.articles.findMany({
        
        skip: skip,
        take: take,
        orderBy: {
          published_at: 'desc', // 或者 'desc'，根据需求排序
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

      
    return (

        <div>
            <div className={styles.main}>
                {/* 文章列表 */}
                <div className={styles.left}>
                    <div className={styles.nav}>
                        <Link href="/" className={styles.current}>最新</Link>
                        <Link href="/random">随机</Link>
                    </div>
                    <div className={styles.list}>
                        <ul>
                            {
                                result && result.map(item => {
                                    return <li key={item.id}>
                                        <h3><Link href={'/article/' + item.id}>{item.title}</Link></h3>
                                        {
                                    item.thumbnail ? <img src={process.env.NEXT_PUBLIC_API_URL + item.thumbnail}></img> : ''
                                }
                                        <p className={styles.summary}>{item.summary}</p>
                                        <div className={styles.ptime}>
                                            {item.published_at.toLocaleDateString()}
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>

                   
                </div>
                <div className={styles.right}>
                    <div className={styles.about}>
                        <h3>关于我</h3>
                        <p>
                            目前是一名前端工程师，关注全栈开发。
                            做过几年设计师，对产品，用户体验，设计，编程，摄影感兴趣。<br></br>
                            博客主要是记录下自己的一些思考。
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
