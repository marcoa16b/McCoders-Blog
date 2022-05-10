import React from 'react'
import Head from 'next/head'
import fs from 'fs'
import Navbar from '@components/Navbar'
import Card from '@components/Card'
import Footer from '@components/Footer'
import styles from '@styles/Home.module.css'
import matter from 'gray-matter'

export default function Home({ articles }) {
  const [loading, setLoading] = React.useState(true); 
  const [articleLimits, setArticleLimits] = React.useState(Array);

  function limiterArticles() {
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
  }

  React.useEffect(() => {
    limiterArticles();
  }, [])

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
