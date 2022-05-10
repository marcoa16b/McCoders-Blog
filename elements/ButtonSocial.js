import React from 'react';
import Link from 'next/link';
import styles from '../styles/elements//SocialButton.module.css';


const ButtonSocial = (props) => {

  const [color, setColor] = React.useState(styles.ListDefault)

  React.useEffect(() => {
    if (props.color === "blue") {
      setColor(styles.ListBlue)
    } else if (props.color === "red") {
      setColor(styles.ListRed)
    } else {
      setColor(styles.ListDefault)
    }
  }, [])

  return (
    <li className={color}>
      <Link href={props.link}>
        <a>{props.icon}</a>
      </Link>
    </li>
  );
};

export default ButtonSocial;