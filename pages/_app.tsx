import Head from 'next/head';
import Script from 'next/script';
import '../styles/global.css'; // Importa tus estilos globales aquí


import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
          <Script 
        src="https://kit.fontawesome.com/b305599118.js" 
        crossOrigin="anonymous"
        strategy="lazyOnload" // Carga el script de manera asíncrona
      />
          <Component {...pageProps} />
        </>
      );
    }

export default MyApp;