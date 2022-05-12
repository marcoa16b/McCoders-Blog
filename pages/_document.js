import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='es'>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB" crossOrigin="anonymous" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`} />
        <script dangerouslySetInnerHTML={{
            __html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              //this defaults to denying
              gtag('consent', 'default', {
                  'analytics_storage': 'denied'
              });
      
              gtag('js', new Date());
      
              //este función es la que nos devuelve el valor de la cookie de preferencias
              function getCookie() {
                  const value = "; " + document.cookie;
                  const parts = value.split("; CookieConsent=");
                  if (parts.length === 2) return parts.pop().split(';').shift();
              }
      
              //únicamente si el valor es true, se cargan los scripts de Google Analytics.
              if(getCookie() === "true"){
                  gtag('consent', 'update', {
                      'analytics_storage': 'granted'
                  });
              }
      
              gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
              });
            `,
          }} 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}