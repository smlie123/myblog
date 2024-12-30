import { Pagination } from 'antd';
import Link from "next/link";
import styles from "./page.module.css";


export default async function Home() {

    async function getArticles(currentPage,pageSize){

        const response = await fetch(`http://localhost:3000/api/auth/article?currentPage=${currentPage}&pageSize=${pageSize}`);
        const result = await response.json();
        return result
    }

    let data = await getArticles(1,30)
   
    return (
        <div className={styles.page}>
            <div className={styles.list}>
                <ul>
                    {
                        data.result && data.result.map(item => {
                            return <li key={item.id}>
                                <h3><Link href={'/article/' + item.id} target="_blank">{item.title}</Link></h3>
                                {
                                    item.summary ? <img src={'http://localhost:3000' + item.thumbnail}></img> : ''
                                }
                                <p className={styles.summary}>{item.summary}</p>
                                <div className={styles.ptime}>
                                    {item.published_at}
                                </div>
                            </li>
                        })
                    }
                </ul>
               
            </div>
        </div>
    );
}
