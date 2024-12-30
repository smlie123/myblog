import Link from "next/link";
import styles from "./page.module.css";


export default async function Home({ params }) {
    const { category, page } = await params;
    console.log(category, page)

    const pageSize = 2;

    async function getArticles(category, currentPage, pageSize) {

        const response = await fetch(`http://localhost:3000/api/auth/article?category=${category}&currentPage=${currentPage}&pageSize=${pageSize}`);
        const result = await response.json();
        return result
    }

    let data = await getArticles(category, page, pageSize)

    const nextPage = "/"+category+'/' + (parseInt(page) + 1);
    const prevPage = "/"+category+'/' + (page - 1);

    console.log(nextPage)
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

            <div className={styles.pagination}>
                {/* Previous button */}
                {page > 1 && (
                    <Link href={prevPage} className={styles.btn}>
                        prev
                    </Link>
                )}

                {/* Page numbers */}
                <span>{page} / {data.page.totalPages}</span>

                {/* Next button */}
                {page < data.page.totalPages && (
                    <Link href={nextPage} className={styles.btn}>
                        next
                    </Link>
                )}
            </div>
        </div>
    );
}
