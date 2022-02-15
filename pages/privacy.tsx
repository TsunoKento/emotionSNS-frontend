import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const Privacy: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>プライバシーポリシー</title>
      </Head>
      <Container>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Emotion プライバシーポリシー
        </Typography>
        <Typography>
          個人情報の管理には最新の注意を払い、以下に掲げた通りに扱います。
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          個人情報の利用目的
        </Typography>
        <Typography>
          当サービスは、利用者からご提供いただく情報を以下の目的の範囲内において利用します。
          <br />
          ・ご本人確認のため <br />
          ・利用規約等で禁じている行為などの調査のため
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          個人情報の第三者への開示について
        </Typography>
        <Typography>
          当サービスにおいて、原則的に第三者に開示・提供することはございません。ただし、次のいずれかに該当する場合、個人情報を開示・提供する場合があります。
          <br />
          ・利用者の同意がある場合 <br />
          ・法令に基づき、個人情報の開示が必要となる場合
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Cookie（クッキー）
        </Typography>
        <Typography>
          Cookie（クッキー）は、利用者のサイト閲覧履歴を、利用者のコンピュータに保存しておく仕組みです。
          <br />
          利用者はCookie（クッキー）を無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。ただし、Cookie（クッキー）を拒否した場合、当サイトのいくつかのサービス・機能が正しく動作しない場合があります
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          本プライバシーポリシーの変更
        </Typography>
        <Typography>
          当サービスは、本プライバシーポリシーの内容を適宜見直し、その改善に努めます。
          <br />
          本プライバシーポリシーは、事前の予告なく変更することがあります。
          <br />
          本プライバシーポリシーの変更は、当サイトに掲載された時点で有効になるものとします。
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          免責事項
        </Typography>
        <Typography>
          利用上の不具合・不都合に対して可能な限りサポートを行っておりますが、利用者が当サービスを利用して生じた損害に関して、開発者は責任を負わないものとします。
        </Typography>
      </Container>
    </Box>
  );
};

export default Privacy;
