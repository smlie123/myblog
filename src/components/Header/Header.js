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
          <Link href="/coding">编程</Link>
          <Link href="/design">设计</Link>
          <Link href="/tools">工具</Link>
          <Link href="/thinking">thinking</Link>
          </div>
      </div>
    </div>
  )
}