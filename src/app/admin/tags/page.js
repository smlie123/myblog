'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Input,Button, } from "antd";

export default function Home() {
    const [tag,setTag] = useState('')
    const [taglist, setTaglist] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 增加tag列表
    const addTag = async function () {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/auth/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tag }),
        });
        const res = await response.json();
        console.log('===========res',res)

        if(res.code===0){
            getTagList()
        }

    }

    //获取列表
    const getTagList = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/auth/tags");
            console.log(response)
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log('result', result)
            setTaglist(result.result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    //更新tag

    //删除tag
    const deleteTag = async (id)=>{
        console.log('delete id',id)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/auth/tags", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        const res = await response.json();
        console.log('===========res',res)

        if(res.code===0){
            getTagList()
        }
    }

    useEffect(() => {
        getTagList();
    }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次

    return (
        <div className={styles.page}>
            <h3>标签列表</h3>
            <Input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={styles.input}
            ></Input>
            <Button onClick={addTag} type="primary">添加</Button>
            <ul>
                {
                    taglist.map(item => {
                        return <li key={item.id}>
                            {item.name} 
                            <Button onClick={()=>updateTag(item.id)} >修改</Button>
                            <Button onClick={()=>deleteTag(item.id)} >删除</Button>
                        </li>
                    })
                }
            </ul>

        </div>
    );
}
