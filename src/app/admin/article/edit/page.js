'use client';
import { useState, useEffect, useRef, useMemo } from "react";
import { Input, Button, Select, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';  // 使用 atom-one-light 主题
import 'react-quill-new/dist/quill.snow.css';

// 动态导入 ReactQuill
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // 确保在客户端加载完成后再配置
    if (typeof window !== 'undefined') {
      const Quill = RQ.Quill;
      if (Quill) {
        // 配置 Quill 以使用 highlight.js
        const Module = Quill.import('modules/syntax');
        Module.DEFAULTS.hljs = hljs;
        Quill.register(Module, true);
      }
    }
    return RQ;
  },
  { ssr: false }
);

const { TextArea } = Input;

const categoryOptions = [
    {
        label: '编程',
        value: 'coding'
    },
    {
        label: '设计',
        value: 'design'
    },
    {
        label: '摄影',
        value: 'photograph'
    },
    {
        label: '工具',
        value: 'tools'
    },
    {
        label: 'thinking',
        value: 'thinking'
    },

]



export default function Home() {
    const searchParams = useSearchParams()

    const [id, setId] = useState(null);

    const [title, setTitle] = useState("");
    const [published_at, setPublished_at] = useState(null);
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [summary, setSummary] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [content, setContent] = useState("");

    const [tagOptions, setTagOptions] = useState([]);

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
        ['code-block']
    ];

    const props = {
        name: 'image',
        action: '/api/auth/upload',
        // headers: {
        //   authorization: 'authorization-text',
        // },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);

                let path = info.file.response.path;

                setThumbnail(path);

            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


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
                const quill = reactQuillRef.current.getEditor()
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

        console.log('---------')
        let reqbody = JSON.stringify({ title, published_at, content, tags: tags.join(), category, summary, thumbnail })
        console.log(reqbody)

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: reqbody
        });

        const data = await res.json();
        if (res.ok) {
            alert('add ok')
        }
    };

    //提交文章
    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log('---------')
        let reqbody = JSON.stringify({ title, published_at, content, tags: tags.join(), category, summary, thumbnail })
        console.log(reqbody)

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/article", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, published_at, title, content, tags: tags.join(), category, summary,thumbnail }),
        });

        const data = await res.json();
        if (res.ok) {
            alert('update ok')
        }
    };

    //文章内容变化
    const handleChange = (value) => {
        setContent(value);
    };

    //获取分类
    const handleCategoryChange = (value) => {
        console.log(`selected ${value}`);
        console.log(value)
        setCategory(value)
    }

    //标签变化
    const handleTagChange = (value) => {
        console.log(`selected ${value}`);
        console.log(value)
        setTags(value)
    }

    const handleCodeBlock = () => {
        const quill = reactQuillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'code-block', '');
    };


    const editorModule = useMemo(() => {
        return {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: handleImageUpload,
                    'code-block': function() {
                        const quill = reactQuillRef.current.getEditor();
                        const range = quill.getSelection();
                        if (range) {
                            if (range.length > 0) {
                                const text = quill.getText(range.index, range.length);
                                quill.deleteText(range.index, range.length);
                                const delta = {
                                    ops: [
                                        { insert: text },
                                        { insert: '\n', attributes: { 'code-block': true } }
                                    ]
                                };
                                quill.insertText(range.index, '\n', 'user');
                                quill.insertEmbed(range.index + 1, 'code-block', text);
                                quill.insertText(range.index + 2, '\n', 'user');
                            } else {
                                quill.insertText(range.index, '\n', 'user');
                                quill.insertEmbed(range.index + 1, 'code-block', '');
                                quill.insertText(range.index + 2, '\n', 'user');
                                quill.setSelection(range.index + 1, 0);
                            }
                        }
                    }
                }
            },
            syntax: true,
            clipboard: {
                matchVisual: false
            }
        }
    }, []);

    //获取列表
    const getTagList = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/tags");
        console.log(response)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const list = result.result;

        let options = [];
        list.map(item => {
            options.push({
                label: item.name,
                value: parseInt(item.id)
            })
        })
        setTagOptions(options);
    }



    //获取单个文章
    const fetchPost = async (id) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/article/' + id);
        const result = await res.json();

        const { title, thumbnail ,content, category, published_at, tags, summary } = result;

        setTitle(title);
        setThumbnail(thumbnail);
        setContent(content);
        setSummary(summary);
        setCategory(category);
        setPublished_at(published_at);

        let tagsArr = tags.split(',');
        let tagIds = [];
        tagsArr.map(item => {
            tagIds.push(parseInt(item))
        })
        setTags(tagIds);
    };

    useEffect(() => {
        getTagList();

        const id = searchParams.get('id')
        console.log('get id', id)

        if (id) {
            setId(id);
            fetchPost(id)
        }


    }, [])


    return (
        <div className={styles.page}>
            <h3>{id ? '编辑' : '新建'}文章</h3>
            <div>
                <div className={styles.row}>
                    <label>标题</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="在这里输入标题"
                        style={{ width: 400 }}
                    />
                </div>

                <div className={styles.row}>
                    <label>时间</label>
                    <Input
                        value={published_at}
                        onChange={(e) => setPublished_at(e.target.value)}
                        placeholder="2019-10-11"
                        style={{ width: 400 }}
                    />
                </div>

                <div className={styles.row}>
                    <label>栏目</label>
                    <Select
                        allowClear
                        style={{
                            width: 400
                        }}
                        placeholder="请选择栏目"
                        value={category}
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
                            width: 400
                        }}
                        placeholder="请选择标签"
                        value={tags}
                        onChange={handleTagChange}
                        options={tagOptions}
                    />
                </div>
                <div className={styles.row}>
                    <label>简介</label>
                    <TextArea
                        rows={4}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="在这里输入简介"
                        style={{ width: 400 }}
                    />

                </div>

                <div className={styles.row}>
                    <label>缩略图</label>
                    <img width={50} src={process.env.NEXT_PUBLIC_API_URL + thumbnail}></img>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>

                <div className={styles.editor}>
                    <ReactQuill
                        ref={reactQuillRef}
                        theme="snow"
                        placeholder='在这里输入内容...'
                        value={content}
                        onChange={setContent}
                        modules={
                            editorModule
                        }
                    />
                </div>
                {
                    id ? <Button onClick={handleUpdate}>提交修改</Button> : <Button onClick={handleSubmit}>发布</Button>
                }
            </div>
        </div>
    );
}
