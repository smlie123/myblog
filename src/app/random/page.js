
'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Home() {

    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [error,setError]= useState(null)

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/random_article");
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log('result', result)
            setData(result.result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        console.log('获取数据')
    }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次


    return (
        <div>

            <div className={styles.main}>
                {/* 文章列表 */}
                <div className={styles.left}>
                    <div className={styles.nav}>
                        <Link href="/" >最新</Link>
                        <Link href="/random" className={styles.current}>随机</Link>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.loading} hidden={data.length>0}>
                            loading...
                        </div>
                        <ul hidden={data.length===0}>
                            {
                                data.map(item => {
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
                <div className={styles.right}>

                </div>
            </div>
        </div>
    );
}
