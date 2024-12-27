'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from 'next/link'


export default function Home() {
  const [data, setData] = useState("");
  const [level, setLevel] = useState(0);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addTag = async function(){
    const res = await fetch("/api/auth/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag:data,level,desc }),
    });
  }

  return (
    <div>
      新建标签
      <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
      <button onClick={addTag}>add tag</button>
    </div>
  );
}
