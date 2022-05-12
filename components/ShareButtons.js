import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaShareAlt } from "react-icons/fa";

import styles from '@styles/components/ShareButton.module.css';

const ShareButtons = (props) => {

  const [scrollClass, setScrollClass] = React.useState(``);
  const [DeviceIsPc, setDeviceIsPc] = React.useState(true);
  const [buttonisActive, setButtonIsActive] = React.useState(true);
  const [mobileButtonsActive, setMobileButtonsActive] = React.useState(`${styles.MobileButton}`);

  const changeActiveButton = () => {
    console.log("ok")
    if (buttonisActive) {
      setMobileButtonsActive(`${styles.MobileButton} ${styles.ActiveMobile}`);
      setButtonIsActive(false);
    } else {
      setMobileButtonsActive(`${styles.MobileButton}`);
      setButtonIsActive(true);
    }
  }

  React.useEffect(() => {
    const pageWidth  = document.documentElement.scrollWidth;
    // console.log(pageWidth)

    if (pageWidth < 990) {
      setDeviceIsPc(false);
    } else {
      setDeviceIsPc(true);
    }

    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 600) {
        setScrollClass(`${styles.SocialShareButtons} ${styles.Active}`)
      } else {
        setScrollClass(`${styles.SocialShareButtons}`)
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  return (
    DeviceIsPc ?
    <div className={scrollClass}>
      <div className={styles.shareButton}>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}`}>
          <a target='_blank'>
            <FaFacebookF className={styles.shareIcon} />
          </a>
        </Link>
      </div>
      <div className={styles.shareButton}>
        <Link href={`https://twitter.com/intent/tweet?text=Hey,%20mira%20este%20increíble%20post%20&url=https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}&via=marcofer16&hashtags=mccoders`}>
          <a target="_blank">
            <FaTwitter className={styles.shareIcon} />
          </a>
        </Link>
      </div>
      <div className={styles.shareButton}>
        <Link href={`https://api.whatsapp.com/send?text=Hey, mira este increíble post: https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}`}>
          <a target='_blank'>
            <FaWhatsapp className={styles.shareIcon} />
          </a>
        </Link>
      </div>
    </div>
    :
    <div className={styles.MobileShareButtons}>
      <div className={mobileButtonsActive}>
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}`}>
          <a target='_blank'>
            <FaFacebookF className={styles.MobileIcon} />
          </a>
        </Link>
      </div>
      <div className={mobileButtonsActive}>
        <Link href={`https://twitter.com/intent/tweet?text=Hey,%20mira%20este%20increíble%20post%20&url=https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}&via=marcofer16&hashtags=mccoders`}>
          <a target="_blank">
            <FaTwitter className={styles.MobileIcon} />
          </a>
        </Link>
      </div>
      <div className={mobileButtonsActive}>
        <Link href={`https://api.whatsapp.com/send?text=Hey, mira este increíble post: https%3A%2F%2Fmc-coders-blog.vercel.app%2Farticle%2F${props.article.meta.slug}`}>
          <a target='_blank'>
            <FaWhatsapp className={styles.MobileIcon} />
          </a>
        </Link>
      </div>
      <div onClick={changeActiveButton} className={styles.MobileButtonToggle}>
        <FaShareAlt className={styles.MobileIcon} />
      </div>
      
    </div>
  );
};

export default ShareButtons;