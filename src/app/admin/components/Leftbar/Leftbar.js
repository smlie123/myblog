'use client'
import React from 'react'
import styles from './Leftbar.module.css'
import Link from 'next/link'

export default function Sidebar() {

  return (
    <div className={styles.leftbar}>
      <dl>
        <dt>文章管理</dt>
        <dd><Link href="/admin/article/">文章列表</Link></dd>
        <dd><Link href="/admin/article/new">新建文章</Link></dd>
      </dl>
       
    </div>
  )
}