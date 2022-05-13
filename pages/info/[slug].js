import React from 'react';
import Markdown from '@components/Markdown';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

import styles from '@styles/article.module.css';

const CookiePolicies = ({ article }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    loading 
    ? 
    <div>LOADING...</div>
    :
    <div className={styles.article}>
      <Navbar />
      <header className={styles.thumbnail_consent}>
        <Image 
          alt='header image'
          src='https://i.imgur.com/uUYYUgu.jpg'
          layout='fill'
          priority={true}
        />
        <div className={styles.title}>
          <h1>{article.meta.title}</h1>
          {/* <p>{article.meta.description}</p> */}
        </div>
      </header>
      <main className={styles.content}>
        <Markdown content={article.content} />
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;

  const content = fs
      .readFileSync(`datamanage/${slug}.md`)
      .toString();

  const info = matter(content);

  const article = {
      meta: {
          ...info.data,
          slug
      },
      content: info.content
  }

  return {
      props: {
          article: article
      }
  }
}

export async function getStaticPaths() {
  const files = fs.readdirSync("datamanage");
  const paths = files.map(file => ({
      params: {
          slug: file.split('.')[0]
      }
  }))
  
  return {
      paths,
      fallback: false,
  }
}

export default CookiePolicies;