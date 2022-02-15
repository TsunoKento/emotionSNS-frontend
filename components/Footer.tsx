import { AppBar, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <AppBar position="static">
      <Link href="/privacy">プライバシーポリシー</Link>
      <Typography>©︎ 2022 KentoT</Typography>
      <Typography>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfyfH6-GaNoYCy9PBnwPUSsZTDbEPMO9Aphy_yRFwfxsDxS-w/viewform">
          お問い合わせ
        </Link>
      </Typography>
    </AppBar>
  );
};
