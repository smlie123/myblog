'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


export default function Home() {
  const params = useParams()
  //const { id } = router.query; // 获取 URL 中的动态参数 `id`

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('params',params)

  

  const fetchPost = async (id) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/auth/article/'+id);
    const posts = await res.json();
    setData(posts);
  };

  useEffect(() => {
    fetchPost(params.id);
  }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次

  return (
    <div className={styles.page}>
      <h3>文章详情页</h3>
      <hr></hr>
      <h1>{data?.title}</h1>
      
      <div dangerouslySetInnerHTML={{__html:data?.content}}></div>
      
        
    </div>
  );
}
