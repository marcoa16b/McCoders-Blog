import React from "react";
import Image from "next/image";
import ButtonNeon from "../elements/ButtonNeon";
import styles from "../styles/components/card.module.css";

const Card = ({ article }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.blog_post}>
        <div className={styles.blog_post_img}>
          <Image alt="image of the card" src={article.thumbnail} layout='fill' />
          {/* <img alt="image of the card" src={article.thumbnail} /> */}
        </div>
        <div className={styles.blog_post_info}>
          <div className={styles.BlogPost_Date}>
            <span>{article.author}</span>
            <span>{article.date}</span>
          </div>
          <h1 className={styles.BlogPost_Title}>{article.title}</h1>
          <p className={styles.BlogPost_Text}>{article.description}</p>
          <ButtonNeon link={`/article/${article.slug}`} text={"Leer más"} />
          {/* <div className={styles.Button}>
            <Link href={`/article/${article.slug}`}>
              <a>Leer mas</a>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
