import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";
import useSWR from "swr";
import { SnackbarContextProvider } from "../contexts/SnackbarContext";

export const UserContext = createContext({
  userId: "",
  name: "",
  image: "",
});

export const MessageContext = createContext({
  open: false,
  status: "",
  message: "",
});

function MyApp({ Component, pageProps }: AppProps) {
  const url = "http://localhost:8000/user/loginUser";
  const fetcher = () =>
    fetch(url, { method: "POST", credentials: "include" }).then((res) =>
      res.json()
    );
  //swr
  const { data } = useSWR(url, fetcher);
  return (
    <SnackbarContextProvider>
      <UserContext.Provider value={data}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </SnackbarContextProvider>
  );
}

export default MyApp;
