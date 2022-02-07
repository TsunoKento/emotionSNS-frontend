import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarContextProvider>
      <Header />
      <Component {...pageProps} />
    </SnackbarContextProvider>
  );
}

export default MyApp;
