
import styles from "./page.module.css";


export default async function Home({ params }) {
  
  const id = (await params).id;
  console.log('====params',id)
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/auth/article/'+id);
  const result = await res.json();
  
  const {title,published_at,content} = result;
  const pdate = published_at.split('T')[0]
  return (
    <div className={styles.page}>
      
        <div className={styles.main}>
          <h1>{title}</h1>
          <div className={styles.info}>{pdate}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{__html:content}}>
          </div>
        </div>

       
    </div>
  );
}
