'use client';
import { Layout } from 'antd';
import Header from './components/Header/Header.js';
import Leftbar from './components/Leftbar/Leftbar';
import styles from './layout.module.css';

const { Content, Sider } = Layout;

export default function RootLayout({ children }) {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        <Sider width={200} className={styles.sider}>
          <Leftbar />
        </Sider>
        <Layout className={styles.mainLayout}>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
