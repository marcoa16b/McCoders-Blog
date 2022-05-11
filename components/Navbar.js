import React from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import { useRouter } from 'next/router';
import styles from '../styles/components/Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  const [winWidth, setWinWidth] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [active, setActive] = React.useState('');
  const [activeBtn, setActiveBtn] = React.useState(false);
  const router = useRouter();

  const setDevice = () => {
    if (winWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  

  const toglleMenu = () => {
    if (!active) {
      setActive(styles.MenuActive)
      setActiveBtn(true)
    } else {
      setActive('')
      setActiveBtn(false)
    }
  }

  React.useEffect(() => {
    var windowWidth = window.innerWidth;
    setWinWidth(windowWidth);
    setDevice();
  })

  return (
    isMobile ? 
    <div>
      <div 
        onClick={toglleMenu}
        className={styles.NavbarMobile}
      >
        <div className={styles.Hamburguer}>
          {activeBtn ? 
            <IoClose />
          :
            <IoMenu />}
        </div>
      </div>
      <div className={`${styles.MenuNavMobile} ${active}`}>
        <Link href='/'>
          <p className={styles.ItemLink}>Home</p>
        </Link>
        <Link href='/categories'>
          <p className={styles.ItemLink}>Categories</p>
        </Link>
        {/* <Link href='/info'>
          <p className={styles.ItemLink}>Information</p>
        </Link> */}
      </div>
    </div>
    :
    <div className={styles.Navbar}>
      <div className={styles.NavIcon}>
        <h2>McCoders</h2>
      </div>
      <nav className={styles.NavLinks}>
        <Link href='/'>
          <p className={styles.ItemLink}>Home</p>
        </Link>
        <Link href='/categories'>
          <p className={styles.ItemLink}>Categories</p>
        </Link>
        {/* <Link href='/info'>
          <p className={styles.ItemLink}>Information</p>
        </Link> */}
      </nav>
    </div>
  );
};

export default Navbar;