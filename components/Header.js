import React from 'react';
import Navbar from './Navbar';
import styles from '@styles/components/Header.module.css';

const Header = (props) => {
  return (
    <header className={styles.HeaderContainer}>
      <Navbar />
      <div className={styles.HeaderText}>
        <h1>{props.title}</h1>
        <p className={styles.HedTxt}>{props.text}</p>
      </div>
    </header>
  );
};

export default Header;