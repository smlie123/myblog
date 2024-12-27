
'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    
    const fetchData = async () => {
        try {
            const response = await fetch("/api/auth/random_article");
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
                        <a href="#">最新</a>
                        <a href="#" className={styles.current}>随机</a>
                    </div>
                    <div className={styles.list}>
                        <ul>
                            {
                                data && data.map(item => {
                                    return <li key={item.id}>
                                        <h3><Link href={'/article/' + item.id} target="_blank">{item.title}</Link></h3>
                                        <img src="https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9c6530b593c947a491721b45e4adefce~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6ICB56CB5bCP5byg:q75.awebp?rk3s=f64ab15b&x-expires=1735799614&x-signature=jZiEX7x6Z9gGMXDirIDUnxeTMr4%3D"></img>
                                        <p>作为一名前端工程师，选择合适的技术栈对项目的成功至关重要，我最近一个星期尝试了下这两个技术栈的组合，大概在一个星期就写了一个小 SAAS，</p>
                                        <div className={styles.tags}>
                                            <span>javascript</span>
                                            <span>react</span>
                                        </div>
                                    </li>
                                })
                            }


                        </ul>
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <div className={styles.about}>
                        <h3>关于我</h3>
                        <p>
                            目前是一名前端工程师，
                            曾经做过几年设计师，对产品，用户体验，设计，编程，摄影感兴趣。<br></br>
                            博客主要是记录下自己的一些思考。<br></br>
                            更多想法可以查看这篇博客，我为什么要做博客？
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
