import { SessionProvider } from "next-auth/react";
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { AppProps } from 'next/app'; // Import AppProps type

function MyApp({ Component, pageProps }: AppProps) { // Use AppProps type for function parameters
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;