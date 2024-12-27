'use client'
import styles from "./page.module.css";
import {Input,Button} from 'antd'
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });


export default function Home() {
  const params = useParams()
  const { id } = params;
  //const { id } = router.query; // 获取 URL 中的动态参数 `id`

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  

  const fetchPost = async () => {
    const res = await fetch('/api/auth/article/'+id);
    const article = await res.json();
    let {title,content} = article;
    setTitle(title);
    setContent(content)
  };

  const submit = async()=>{
     const res = await fetch('/api/auth/article',{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id,title, content }),
     });
     
  }

  useEffect(() => {
    fetchPost();
  }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次

  return (
    <div className={styles.page}>
        <h3>新建文章</h3>
        <div className={styles.editor}>
            <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="在这里输入标题" />
        
            <div  className={styles.editor}> 
                <ReactQuill 
                    theme="snow" 
                    placeholder='在这里输入...'
                    value={content} 
                    onChange={setContent} 
                />
            </div>
          
            <Button onClick={submit}>提交</Button>
        
        </div>
    </div>
  );
}
