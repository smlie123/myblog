'use client';

import { useState, useEffect, useRef,useMemo } from "react";
import { Input, Button } from 'antd'
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });



export default function Home() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    let reactQuillRef = useRef(null);
    let quillRef = useRef(null);
    

    const showUploader =()=>{
        console.log('show image uploader')
    }

    //编辑器配置

    
    
    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'align': [] }],
        ['image'], // 默认的图片按钮
        ['clean'], // 清除格式按钮
      ];
    

      // 自定义图片上传的处理函数
  const handleImageUpload = () => {

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        uploadImage(file);
      }
    };
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // 模拟上传请求，假设上传到 '/api/upload'
    fetch('/api/auth/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data',data)
        console.log('!!!!!!!!!!!!')
        console.log(reactQuillRef)
        const quill = reactQuillRef.current.getEditor()
        console.log(quill)
        const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', data.path);
      })
      .catch((error) => {
        console.error('Image upload failed:', error);
      });
  };
    //提交文章
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
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

    const handleChange = (value) => {
        setContent(value);
    };

    const editorModule = useMemo(()=>{
        return {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                  image: handleImageUpload, // 自定义图片上传按钮事件
                },
            },
        }
    },[])


    return (
        <div className={styles.page}>
            <h3>新建文章</h3>
            <div>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="在这里输入标题" />

                <div className={styles.editor}>
                    <ReactQuill
                        ref={reactQuillRef}
                        theme="snow"
                        placeholder='在这里输入内容...'
                        value={content}
                        onChange={setContent}
                        modules={editorModule}
                    />
                </div>

                <Button onClick={handleSubmit}>发布</Button>

            </div>
        </div>
    );
}
