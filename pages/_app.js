import '../styles/globals.css'
import '../styles/markdown.css'
import '../styles/cookies.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
      const handleRouteChange = (url) => {
          window.gtag("config", process.env.GOOGLE_ANALYTICS, {
              page_path: url,
          });
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
          router.events.off("routeChangeComplete", handleRouteChange);
      };
  }, [router.events]);
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent
        location="bottom"
        buttonText="Aceptar cookies."
        onAccept={() => location.reload()}
        cookieName="CookieConsent"
        expires={150}
        declineButtonClasses="DeclineButton"
        buttonClasses='AcceptButton'
        enableDeclineButton="true"
        declineButtonText="Rechazar cookies"
      >
        Este sitio utiliza cookies para brindar una mejor experiencia de usuario.
        <Link href="/info/cookies-info">
          <a target="_blank">Política de Cookies</a>
        </Link>
      </CookieConsent>
    </>
    
  
  )
}

export default MyApp
