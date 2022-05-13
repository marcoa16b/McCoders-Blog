import React from 'react';
import CategoriesList from '@utils/categories';
import Head from 'next/head';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import Header from '@components/Header';
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
        <title>MarsElit blog | Tecnología y más</title>
        <meta name="description" content="Blog personal enfocado en tecnología" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <header className={styles.HeaderContainer}>
        <Navbar />
        <div className={styles.HeaderText}>
          <h1>Categorías del blog</h1>
          <p className={styles.HedTxt}>Selecciona la categoría que quieres ver y se desplegará la lista completa de entradas relacionadas a esa categoría.</p>
        </div>
      </header> */}
      <Header 
        title={'Categorías del blog'} 
        text={'Selecciona la categoría que quieres ver y se desplegará la lista completa de entradas relacionadas a esa categoría.'} 
      />
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