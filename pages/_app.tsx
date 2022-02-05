import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarContextProvider>
      <Component {...pageProps} />
    </SnackbarContextProvider>
  );
}

export default MyApp;
