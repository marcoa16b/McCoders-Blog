import React, { useCallback } from 'react'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import Navbar from '@components/Navbar'
import Header from '@components/Header'
import Card from '@components/Card'
import Footer from '@components/Footer'
import styles from '@styles/Home.module.css'

export default function Home({ articles }) {
  
  const [loading, setLoading] = React.useState(true); 
  const [articleLimits, setArticleLimits] = React.useState(Array); 

  const getLimitedArticles = useCallback(()=>{
    if(articles.length < 10){
      setArticleLimits(articles);
    } else {
      const arr = [];
      for(let i in articles){
        if(parseInt(i) < 10) {
          arr.push(articles[i])
        }
      }
      setArticleLimits(arr);
    }
    setLoading(false);
  }, [articles])

  React.useEffect(() => {
    getLimitedArticles();
  }, [getLimitedArticles])

  return (
    loading 
    ? 
    <div>LOADING...</div>
    :
    <div className={styles.container}>
      <Head>
        <title>MarsElit blog | tecnología y más</title>
        <meta name="description" content="Un blog sobre tecnología y mucho más" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header className={styles.HeaderContainer}>
        <Navbar />
        <div className={styles.HeaderText}>
          <h1>MarsElit Blog</h1>
          <p className={styles.HedTxt}>Hola, mi nombre es Marco, bienvenido o bienvenida seas a mi blog personal donde encontraras información sobre tecnología.</p>
        </div>
      </header> */}
      <Header 
        title={'MarsElit Blog'} 
        text={'Hola, mi nombre es Marco, bienvenido o bienvenida seas a mi blog personal donde encontraras información sobre tecnología.'} 
      />

      <main className={styles.Main}>
        <h1 className={styles.TitleMain}>Últimos post</h1>
        <div className={styles.decorator}></div>
        <div className={styles.PostsContainer}>
          {
            articleLimits.map((article, i) => (
                <Card key={i} article={article} />
            ))
          }
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  let articles = files.map(file => {
    const data = fs
          .readFileSync(`posts/${file}`)
          .toString();
    
      return {
        ...matter(data).data,
        slug: file.split('.')[0]
      };
  });

  return {
    props: {
      articles: articles
    }
  };
}
