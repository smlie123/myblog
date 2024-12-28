'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { Input, Button, Select } from 'antd'
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });


export default function Home() {
    const searchParams = useSearchParams()

    const [id, setId] = useState(null);

    const [title, setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [tags,setTags] = useState([]);
    const [content, setContent] = useState("");
    

    const [categoryOptions,setCategoryOptions] = useState([]);
    const [tagOptions,setTagOptions] = useState([]);
    


    let reactQuillRef = useRef(null);

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
                console.log('data', data)
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
            body: JSON.stringify({ title, content, tags:tags.join() ,category}),
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

    //提交文章
    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/article", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id,title, content, tags:tags.join() ,category}),
        });

        const data = await res.json();
        if (res.ok) {
            // 登录成功后，保存 JWT，并跳转到主页
            //localStorage.setItem("token", data.token);



            alert('update ok')
        } else {
            setError(data.message || "Something went wrong");
        }
    };

    //文章内容变化
    const handleChange = (value) => {
        setContent(value);
    };

    //获取分类


    //标签变化
    const handleTagChange = (value)=>{
        console.log(`selected ${value}`);
        console.log( value)
        setTags(value)
    }

    const handleCategoryChange = (value)=>{
        setCategory(value);
    }

    const editorModule = useMemo(() => {
        return {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: handleImageUpload, // 自定义图片上传按钮事件
                },
            },
        }
    }, [])

    //获取列表
    const getTagList = async () => {
        const response = await fetch("/api/auth/tags");
        console.log(response)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const list = result.result;

        let options = [];
        list.map(item=>{
            options.push({
                label:item.name,
                value:parseInt(item.id)
            })
        })
        setTagOptions(options);
    }

    //获取列表
    const getCategoryList = async () => {
        const response = await fetch("/api/auth/category");
        console.log(response)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const list = result.result;

        let options = [];
        list.map(item=>{
            options.push({
                label:item.name,
                value:item.id
            })
        })
        setCategoryOptions(options);

    }

    //获取单个文章
    const fetchPost = async (id) => {
        const res = await fetch('/api/auth/article/'+id);
        const result = await res.json();
        console.log('获取文章-------------')
        console.log(result);
        const { title,content,category,tags } = result;

        setTitle(title);
        setContent(content);
        setCategory(category+'');

        let tagsArr = tags.split(',');
        let tagIds = [];
        tagsArr.map(item=>{
            tagIds.push(parseInt(item))
        })
        setTags(tagIds);
      };

    useEffect(()=>{
        getTagList();
        getCategoryList();
        
        
        const id = searchParams.get('id')
        console.log('get id',id)

        setId(id);
        fetchPost(id)
 
    },[])


    return (
        <div className={styles.page}>
            <h3>{id?'编辑':'新建'}文章{id}</h3>
            <div>
                <div className={styles.row}>
                    <label>标题</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="在这里输入标题" 
                        style={{ width:400}}
                    />
                </div>

                <div className={styles.row}>
                    <label>栏目</label>
                    <Select
                        allowClear
                        style={{ width:400 }}
                        placeholder="请选择栏目"
                        value={"coding"}
                        onChange={handleCategoryChange}
                        options={categoryOptions}
                    />
                </div>

                <div className={styles.row}>
                    <label>标签</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width:400
                        }}
                        placeholder="请选择标签"
                        value={tags}
                        onChange={handleTagChange}
                        options={tagOptions}
                    />
                </div>
                
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
                
                {
                    id ? <Button onClick={handleUpdate}>提交修改</Button> :<Button onClick={handleSubmit}>发布</Button>
                }
                
                

            </div>
        </div>
    );
}
