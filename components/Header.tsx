import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { PostModal } from "./PostModal";
import { LoginModal } from "./LoginModal";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useLoginUser } from "../hooks/useLoginUser";
import Link from "next/link";

const ResponsiveAppBar = () => {
  const { loginUser } = useLoginUser();
  const router = useRouter();

  const signOutGoogle = async () => {
    try {
      await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const { setSnackState } = React.useContext(SnackbarContext);
  const searchOpen = () => {
    console.log("検索ボタンを押下しました");
    setSnackState({ isOpen: true, status: "success", message: "成功" });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: "flex" }}
            >
              LOGO
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={searchOpen}
            >
              <SearchIcon fontSize="large" />
            </Button>
            {loginUser?.userId ? (
              <>
                <Button
                  sx={{ mt: 1.5, mb: 2.5, color: "white" }}
                  onClick={signOutGoogle}
                >
                  <LogoutIcon fontSize="large" />
                </Button>
                <PostModal>
                  <AddCircleIcon fontSize="large" />
                </PostModal>
                <Link href={`/profile/${loginUser.userId}`}>
                  <Tooltip title="Open settings">
                    <IconButton sx={{ mt: 1.5, mb: 2.5 }}>
                      <Avatar
                        src={
                          loginUser?.image || "https://placehold.jp/150x150.png"
                        }
                      />
                    </IconButton>
                  </Tooltip>
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
