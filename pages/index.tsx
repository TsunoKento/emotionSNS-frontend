import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import Tab from "../components/Tab";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>emotionSNS</title>
      </Head>
      <Header />
      <Container>
        <SearchBar />
        <Tab />
      </Container>
    </div>
  );
};

export default Home;
