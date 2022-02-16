import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Box } from "@mui/material";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <SnackbarContextProvider>
        <Header />
        <Box sx={{ minHeight: "100vh" }}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </SnackbarContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
