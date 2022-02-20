import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { IconLabelTabs } from "../components/Tab";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ホーム</title>
      </Head>
      <Container>
        <IconLabelTabs userId="" />
      </Container>
    </div>
  );
};

export default Home;
