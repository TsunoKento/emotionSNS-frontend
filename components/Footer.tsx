import { AppBar, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Link href="/privacy">プライバシーポリシー</Link>
      <Link href="/terms">利用規約</Link>
      <Typography>©︎ 2022 KentoT</Typography>
      <Typography>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfyfH6-GaNoYCy9PBnwPUSsZTDbEPMO9Aphy_yRFwfxsDxS-w/viewform">
          お問い合わせ
        </Link>
      </Typography>
    </AppBar>
  );
};
