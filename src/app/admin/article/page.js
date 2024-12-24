'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from 'next/link'

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/auth/article");
      console.log(response)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log('result',result)
      setData(result.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次

  return (
    <div className={styles.page}>
      文章列表
      <ul>
      {
          data && data.map(item=>{
            return <li key={item.id}>
              <Link href={'/admin/article/'+item.id}>{item.title} -- {item.published_at}</Link>
            </li>
          })
        }
      </ul>
        
    </div>
  );
}
