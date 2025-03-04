//首页
import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client';
import Header from '@/components/Header/Header'
const prisma = new PrismaClient();


export default async function Home() {
    const skip = 1;
    const take = 20;
    
    const result = await prisma.articles.findMany({
        
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
                                        <h3><Link href={'/article/' + item.id} target="_blank">{item.title}</Link></h3>
                                        
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
                            博客主要是记录下自己的一些思考。<br></br>
                            更多想法可以查看这篇博客，我为什么要做博客？
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
