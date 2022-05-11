import '../styles/globals.css'
import '../styles/markdown.css'
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
        buttonText="Sí, utilizar cookies."
        onAccept={() => location.reload()}
        cookieName="CookieConsent"
        expires={150}
        enableDeclineButton="true"
        declineButtonText="No, no utilizar cookies"
      >
        Poner aquí el mensaje sobre el uso de cookies
        <a href="#">Política de Cookies</a>.
      </CookieConsent>
    </>
    
  
  )
}

export default MyApp
