import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function Home({ params }) {
    const { category, page } = params;
    const pageSize = 10;
    const skip = (parseInt(page) - 1) * pageSize;

    const prisma = new PrismaClient();

    const [data, total] = await Promise.all([
        prisma.articles.findMany({
            where: {
                category: category
            },
            skip: skip,
            take: pageSize,
            orderBy: {
                published_at: 'desc'
            },
            select: {
                id: true,
                title: true, 
                summary: true,
                thumbnail: true,
                published_at: true
            }
        }),
        prisma.articles.count({
            where: {
                category: category
            }
        })
    ]);

    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;
    
    return (
        <div className={styles.page}>
            <div className={styles.list}>
                <ul>
                    {data && data.map(item => {
                        return <li key={item.id}>
                            <h3><Link href={'/article/' + item.id} target="_blank">{item.title}</Link></h3>
                            {item.thumbnail && (
                                <img src={'http://localhost:3000' + item.thumbnail} alt={item.title} />
                            )}
                            <p className={styles.summary}>{item.summary}</p>
                            <div className={styles.ptime}>
                                {item.published_at.toLocaleDateString()}
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <div className={styles.pagination}>
                {hasPrevPage && (
                    <Link href={`/${category}/${parseInt(page) - 1}`} className={styles.pageLink}>
                        上一页
                    </Link>
                )}
                <span className={styles.pageInfo}>
                    第 {page} 页 / 共 {totalPages} 页
                </span>
                {hasNextPage && (
                    <Link href={`/${category}/${parseInt(page) + 1}`} className={styles.pageLink}>
                        下一页
                    </Link>
                )}
            </div>
        </div>
    );
}
