
import styles from "./page.module.css";
export default function Home({ params }) {


 console.log('params-----------------',params.type)
  
  
  return (
    <div className={styles.page}>
      
       这里是【{params.type}】文章分类列表
       
    </div>
  );
}
