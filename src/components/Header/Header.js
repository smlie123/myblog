import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

export default async function Sidebar() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.logo}> 
          <Image
              src="/images/logo.jpg"
              alt="王嘉的个人博客"
              width={50}
              height={50}
              priority
            />
            什么嘉的个人博客
        </div>
        <div className={styles.menu}>
          <Link href="/article">编程</Link>
          <Link href="/about">产品</Link>
          <Link href="/login">设计</Link>
          <Link href="/login">工具</Link>
          <Link href="/register">摄影</Link>
          <Link href="/admin">读书思考</Link>
          </div>
      </div>
    </div>
  )
}