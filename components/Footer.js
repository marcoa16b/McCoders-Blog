import React from 'react';
import SocialButtons from './SocialButtons';
import styles from '../styles/components/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.FooterHome}>
      <h1>Sobre el creador de este blog</h1>
      <p>Mi nombre es Marco Agüero, soy desarrollador Frontend y estudiante de ingenieria en informatica.</p>
      <h2 className={styles.TitleMain}>Redes sociales</h2>
      <SocialButtons />
    </footer>
  );
};

export default Footer;