import React from "react";
import ButtonSocial from '../elements/ButtonSocial';
import { FaInstagram, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

import styles from '../styles/components/SocialButtonsBar.module.css';

const SocialButtons = () => {
  return(
    <div className={styles.SocialContainer}>
      <ul className={styles.ul}>
        <ButtonSocial 
          link='https://www.instagram.com/marco_a16b/' 
          icon={<FaInstagram />} 
          color={"blue"}
        />
        <ButtonSocial 
          link='https://github.com/marcoa16b/' 
          icon={<FaGithub />} 
        />
        <ButtonSocial 
          link='https://twitter.com/mars_elit' 
          icon={<FaTwitter />} 
          color={"red"}
        />
        <ButtonSocial 
          link='https://www.linkedin.com/in/marcoa16b/' 
          icon={<FaLinkedin />} 
        />
      </ul>
    </div>
  );
}

export default SocialButtons;



