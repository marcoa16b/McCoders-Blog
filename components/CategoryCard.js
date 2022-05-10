import Link from 'next/link';
import React from 'react';
import styles from '../styles/components/categoryCard.module.css';


const CategoryCard = (props) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Content}>
        <h1>{props.category}</h1>
        <div className={styles.Button}>
          <Link href={`/categories/${props.category}`}>
            <a>Ver entradas</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;