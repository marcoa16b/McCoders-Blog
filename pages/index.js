import React, { useCallback } from 'react'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import Navbar from '@components/Navbar'
import Card from '@components/Card'
import Footer from '@components/Footer'
import styles from '@styles/Home.module.css'

export default function Home({ articles }) {
  /*
   * index.js => "/" => Home route
   * 
   * Se crean 2 estados "loading" y "articleLimits" 
   * loading se encarga de evitar que la pagina cargue completamente antes de obtener 
   * los articulos. 
   * articleLimits se encarga de almacenar los 10 articulos mas recientes.
   * */
  const [loading, setLoading] = React.useState(true); 
  const [articleLimits, setArticleLimits] = React.useState(Array);

  /* limiterArticles => se encarga de obtener los ultimos 10 articulos para 
   * almacenarlos en articleLimits y no mostrar mas de 10 articulos
  */
  // function limiterArticles() {
  //   if(articles.length < 10){
  //     setArticleLimits(articles);
  //   } else {
  //     const arr = [];
  //     for(let i in articles){
  //       if(parseInt(i) < 10) {
  //         arr.push(articles[i])
  //       }
  //     }
  //     setArticleLimits(arr);
  //   }
  //   setLoading(false);
  // }

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
        <title>McCoders blog | tecnología y más</title>
        <meta name="description" content="Un blog sobre tecnología y mucho más" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.HeaderContainer}>
        <Navbar />
        <div className={styles.HeaderText}>
          <h1>McCoders Blog</h1>
          <p className={styles.HedTxt}>Este es un blog enfocado en tecnología.</p>
        </div>
      </header>

      <main className={styles.Main}>
        <h1 className={styles.TitleMain}>Ultimos post</h1>
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
