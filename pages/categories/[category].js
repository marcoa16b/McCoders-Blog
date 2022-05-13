import React, { useCallback } from 'react';
import Head from 'next/head';
import Card from '@components/Card';
import fs from 'fs';
import matter from 'gray-matter';
import CategoriesList from '@utils/categories';
import Link from 'next/link';
import Navbar from '@components/Navbar';
import Header from '@components/Header';
import Footer from '@components/Footer';

import styles from '@styles/Home.module.css';

const CategoryPost = ({ articles }) => {
  const [loading, setLoading] = React.useState(true);
  const [listArticles, setListArticles] = React.useState(Array);

  const getCategoryOfPage = () => {
    const arrayOfCategories = CategoriesList();
    let URLactual = window.location.pathname;
    let category = '';
    for (var i in arrayOfCategories){
      if (URLactual.includes(arrayOfCategories[i])) {
        category = arrayOfCategories[i];
        break;
      }
    }
    return category;
  }

  const getArrayOfArticles = () => {
    const categoriesArticles = [];
    const category = getCategoryOfPage();
    for (var i in articles) {
      if (articles[i].categories.includes(category)) {
        categoriesArticles.push(articles[i])
      }
    }
    setListArticles(categoriesArticles)
    return categoriesArticles;
  }

  function searchCategories() {
    if (articles.length > 0) {
      if (getArrayOfArticles() != []) {
        if (listArticles != null){
          setLoading(false);
        } else {
          const arr = getArrayOfArticles();
          setListArticles(arr);
          setLoading(false);
        }
      } else {
        console.log("Error ocurred...")
      }
    } else {
      console.log("Not articles")
    }
  }

  React.useEffect(() => {
    searchCategories();
  }, []);

  return (
    loading 
    ? 
    <div>LOADING...</div>
    :
    <div className={styles.container}>
      <Head>
        <title>McCoders blog | tecnología y más</title>
        <meta name="description" content="Categorías del blog mccoders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className={styles.HeaderContainer}>
        <Navbar />
        <div className={styles.HeaderText}>
          <h1>McCoders Blog</h1>
          <p className={styles.HedTxt}>Este es un blog enfocado en tecnología.</p>
        </div>
      </header> */}
      <Header 
        title={'MarsElit Blog'} 
        text={'Hola, mi nombre es Marco, bienvenido o bienvenida seas a mi blog personal donde encontraras información sobre tecnología.'} 
      />
      <main>
        <div className={styles.PostsContainer}>
          {
            listArticles ? 
            listArticles.map((article, i) => (
                <Card key={i} article={article} />
            ))
            :
              <h1>Not articles</h1>
          }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const list = CategoriesList();
  const paths = list.map(item => ({
    params: {
      category: item
    }
  }));

  return {
      paths, 
      fallback: false //indicates the type of fallback
  }
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

export default CategoryPost;