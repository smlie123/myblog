'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Input,Button, } from "antd";

export default function Home() {
    const [name,setName] = useState('')
    const [categoryList, setCategoryList] = useState([]);

    // 增加分类列表
    const addCategory = async function () {
        const response = await fetch("http://localhost:3000/api/auth/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const res = await response.json();
        console.log('===========res',res)

        if(res.code===0){
            getCategoryList()
        }

    }

    //获取列表
    const getCategoryList = async () => {
        const response = await fetch("http://localhost:3000/api/auth/category");
        console.log(response)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log('result', result)
        setCategoryList(result.result);
}

    //删除tag
    const deleteItem = async (id)=>{
        console.log('delete id',id)
        const response = await fetch("http://localhost:3000/api/auth/category", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        const res = await response.json();
        console.log('===========res',res)

        if(res.code===0){
            getCategoryList()
        }
        
    }

    useEffect(() => {
        getCategoryList();
    }, []); // 空依赖数组意味着该请求只会在组件挂载时发起一次

    return (
        <div className={styles.page}>
            <h3>分类列表</h3>
            
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="设计"
            ></Input>

            <Button onClick={addCategory} type="primary">添加</Button>
            <ul>
                {
                    categoryList.map(item => {
                        return <li key={item.id}>
                            {item.name} 
                            <Button onClick={()=>updateItem(item.id)} >修改</Button>
                            <Button onClick={()=>deleteItem(item.id)} >删除</Button>
                        </li>
                    })
                }
            </ul>

        </div>
    );
}
