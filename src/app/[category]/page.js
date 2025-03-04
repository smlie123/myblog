import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client';
import Pagination from '@/components/Pagination';

const prisma = new PrismaClient();

export default async function CategoryPage({ params, searchParams }) {
    const category = params.category;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 20;
    
    // 获取总数
    const total = await prisma.articles.count({
        where: {
            category: category
        }
    });

    // 获取当前页的文章列表
    const articles = await prisma.articles.findMany({
        where: {
            category: category
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            published_at: 'desc'
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
        <div className={styles.container}>
            {/* <h1 className={styles.title}>{category}</h1> */}
            <div className={styles.articleList}>
                {articles.map(article => (
                    <div key={article.id} className={styles.articleItem}>
                        <h3>
                            <Link href={`/article/${article.id}`}>
                                {article.title}
                            </Link>
                        </h3>
                        {
                                    article.thumbnail ? <img src={process.env.NEXT_PUBLIC_API_URL + article.thumbnail}></img> : ''
                                }
                        <p className={styles.summary}>{article.summary}</p>
                        <div className={styles.meta}>
                            <span className={styles.date}>
                                {article.published_at.toLocaleDateString()}
                            </span>
                            {/* <span className={styles.tags}>{article.tags}</span> */}
                        </div>
                    </div>
                ))}
            </div>
            
            <Pagination 
                current={page}
                total={total}
                pageSize={pageSize}
                baseUrl={`/${category}`}
            />
        </div>
    );
}