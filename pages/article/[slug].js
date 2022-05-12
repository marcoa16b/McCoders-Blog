import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Markdown from '@components/Markdown';
import ShareButtons from '@components/ShareButtons';
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import styles from '@styles/article.module.css';

const Article = ({ article }) => {

  const [loading, setLoading] = React.useState(true);
  // const [scroll, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
    console.log()
  }, [])

  return (
    loading 
    ? 
    <div>LOADING...</div>
    :
    <div className={styles.article}>
      <Head>
        <title>{article.meta.title}</title>
        <meta name="description" content={article.meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <header className={styles.thumbnail}>
              
        {/* <img alt='header image' src={article.meta.thumbnail} /> */}
        <Image 
          alt='header image'
          src={article.meta.thumbnail}
          // width={800}
          // height={600}
          layout='fill'
          priority={true}
        />

        <div className={styles.title}>
          <h1>{article.meta.title}</h1>
        </div>
      </header>

      <main className={styles.content}>
        <Markdown content={article.content} />
        <ShareButtons article={article} />
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;

  const content = fs
      .readFileSync(`posts/${slug}.md`)
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
  const files = fs.readdirSync("posts");
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


export default Article;