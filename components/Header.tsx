import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { PostModal } from "./PostModal";
import { LoginModal } from "./LoginModal";
import LoginIcon from "@mui/icons-material/Login";
import { UserContext } from "../pages/_app";
import { useRouter } from "next/router";
import { SnackbarContext } from "../contexts/SnackbarContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const currentUser = React.useContext(UserContext);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOutGoogle = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
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
    <AppBar position="static" sx={{ mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: "flex" }}
          >
            LOGO
          </Typography>

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
            {currentUser?.userId ? (
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
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ mt: 1.5, mb: 2.5 }}
                  >
                    <Avatar
                      src={
                        currentUser?.image || "https://placehold.jp/150x150.png"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
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
