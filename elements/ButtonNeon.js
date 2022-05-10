import React from 'react';
import Link from 'next/link';
import styles from '../styles/elements/Button.module.css';

const ButtonNeon = (props) => {
  return (
    <div className={styles.Button}>
      <Link href={props.link}>
        <a>{props.text}</a>
      </Link>
    </div>
  );
};

export default ButtonNeon;