import React from 'react';
import CategoriesList from '@utils/categories';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import CategoryCard from '@components/CategoryCard';
import Footer from '@components/Footer';

import styles from '@styles/categories.module.css';

const Categories = () => {
  const [myArray, setMyArray] = React.useState(Array);

  React.useEffect(() => {
    const array = CategoriesList();
    setMyArray(array)
  }, [])
  
  return (
    <div className={styles.PageContainer}>
      <Head>
        <title>McCoders blog | tecnologia y más</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.HeaderContainer}>
        <Navbar />
        <div className={styles.HeaderText}>
          <h1>Categorias del blog</h1>
          <p className={styles.HedTxt}>Selecciona la categoria que quieres ver y se desplagara la lista completa de entradas relacionadas a esa categoria.</p>
          <div className={styles.Button}>
            <Link href="#">
              <a>Button</a>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className={styles.CategoriesContainer}>
          {
            myArray.map((cat, i) => (
              <CategoryCard category={cat} key={i} />
            ))
          }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;