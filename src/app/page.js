//首页
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {

    async function getArticles(currentPage,pageSize){

        const response = await fetch(`http://localhost:3000/api/auth/article?currentPage=${currentPage}&pageSize=${pageSize}`);
        const result = await response.json();
        return result
    }

    //获取最新30篇
    let data = await getArticles(1,30)
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
