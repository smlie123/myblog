import { Pagination } from 'antd';
import Link from "next/link";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function Home() {
    const skip = 0;
    const take = 30;
    
    const data = await prisma.articles.findMany({
        skip: skip,
        take: take,
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
    });
    
   
    return (
        <div className={styles.page}>
            <div className={styles.list}><ul>
                    {
                        data && data.map(item => {
                            return <li key={item.id}>
                                <h3><Link href={'/article/' + item.id} target="_blank">{item.title}</Link></h3>
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
    );
}
