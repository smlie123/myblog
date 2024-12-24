import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

export default async function Sidebar() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}> 
      <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <div>
        <Link href="/article">文章列表</Link> | 
        <Link href="/about">关于我们</Link> | 
        <Link href="/login">登录</Link> | 
        <Link href="/register">注册</Link> | 
        <Link href="/admin">后台管理</Link>
        
        </div>
    </div>
  )
}