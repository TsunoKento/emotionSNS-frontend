import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { PostModal } from "./PostModal";
import { LoginModal } from "./LoginModal";
import LoginIcon from "@mui/icons-material/Login";
import { useLoginUser } from "../hooks/useLoginUser";
import Link from "next/link";
import Image from "next/image";

const ResponsiveAppBar = () => {
  const { loginUser } = useLoginUser();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Box sx={{ mr: 2, display: "flex" }}>
              <img src="/logo.jpeg" width={138} height={86} />
            </Box>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {loginUser?.userId ? (
              <>
                <PostModal>
                  <AddCircleIcon fontSize="large" />
                </PostModal>
                <Link href={`/profile/${loginUser.userId}`}>
                  <IconButton sx={{ mt: 1.5, mb: 2.5 }}>
                    <Avatar src={loginUser?.image} />
                  </IconButton>
                </Link>
              </>
            ) : (
              <LoginModal>
                <LoginIcon fontSize="large" />
              </LoginModal>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
