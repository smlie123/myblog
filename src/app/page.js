import Image from "next/image";
import styles from "./page.module.css";
import Header from '@/components/Header/Header'

export const metadata = {
  title: '王嘉的个人博客',
  description:'关注产品，设计，编程，学习的博客，分享国内外好文',
  keywords:'设计，编程，产品，学习'
}

export default function Home() {
  return (
    <div>
      <Header></Header>
       这里是首页
    </div>
  );
}
