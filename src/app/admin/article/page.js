'use client'

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Button,Popconfirm } from 'antd';
import Link from 'next/link'


export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/article");
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

  const deleteArticle = async (id)=>{
    try {
      const response = await fetch("http://localhost:3000/api/auth/article/"+id,{
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
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
      <h3>文章列表</h3>
      <ul className={styles.list}>
        {
          data && data.map(item => {
            return <li key={item.id}>
                <div className={styles.btns}>
                    <Link href={'/admin/article/edit?id=' + item.id}><Button size="small">编辑</Button></Link>
                    <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={()=>deleteArticle(item.id)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="small">删除</Button>
                  </Popconfirm>
                    
                </div>
                <Link href={'/article/' + item.id} target="_blank">{item.title} -- {item.published_at}</Link>
                
            </li>
          })
        }
      </ul>

    </div>
  );
}
