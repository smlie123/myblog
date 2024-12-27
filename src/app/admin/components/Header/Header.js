'use client'
import React from 'react'
import styles from './Header.module.css'
import Cookies from 'js-cookie'

export default function Sidebar() {

  function logout(){
    console.log('logout')
    console.log(Cookies.get('token'))
    Cookies.remove('token')
    console.log(Cookies.get('token'))
  }

 

  return (
    <>
      <div className={styles.header}> 
        <span>欢迎您，admin</span>
        <span onClick={logout}>退出</span>
      </div>
      
    </>
  )
}