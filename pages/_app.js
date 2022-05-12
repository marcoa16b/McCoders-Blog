import '../styles/globals.css'
import '../styles/markdown.css'
import '../styles/cookies.css'
import { useEffect } from "react";
import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";

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
        Este sitio utiliza cookies para brindar una mejor experiencia de usuario
        <a href="#">Política de Cookies</a>.
      </CookieConsent>
    </>
    
  
  )
}

export default MyApp
