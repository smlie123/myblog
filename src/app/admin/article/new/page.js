'use client';
import { useState,useEffect,useRef} from "react";
import Image from "next/image";
import Quill from 'quill';
import styles from "./page.module.css";
import 'quill/dist/quill.snow.css'; 

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editorContent,setEditorContent] = useState('');
  const [error, setError] = useState("");

  const quillInstance= useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const contentHtml = quillInstance.current.root.innerHTML;
console.log(contentHtml);
    // console.log(quillInstance)

    
    const res = await fetch("/api/auth/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content:contentHtml }),
    });

    const data = await res.json();
    if (res.ok) {
      // 登录成功后，保存 JWT，并跳转到主页
      //localStorage.setItem("token", data.token);
      
      

      alert('add ok')
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // 组件首次挂载后执行的操作
    console.log('Component did mount (DOM loaded)');
    const container = document.getElementById('editor');
    quillInstance.current = new Quill(container, {
      theme: 'snow',  // 选择主题
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['image'],
        ],
      },
    });

    quillInstance.current.root.innerHTML = editorContent;
    // 监听编辑器内容变化
    quillInstance.current.on('text-change', (delta, oldDelta, source) => {
      const content = quillInstance.current.root.innerHTML;
      if (content !== editorContent) {
        setEditorContent(content);  // 更新 state
      }
    });

    // 如果你想在组件卸载时执行清理操作，可以返回一个清理函数
    return () => {
      console.log('Component will unmount (cleanup)');
    };
  }, []);  

  return (
    <div className={styles.page}>
        <h1>新建文章</h1>
        <div className={styles.editor}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>内容</label>
            <input
              type="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">发布</button>
          {error && <p>{error}</p>}
        </form>
        <div id="editor"></div>
        </div>
    </div>
  );
}
