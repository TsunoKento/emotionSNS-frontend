import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import React, { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useSWRConfig } from "swr";
import { LoginUser } from "../types/loginUser";

type inputData = {
  userName: string;
  name: string;
};

type Props = {
  user: LoginUser | undefined;
};

export const SettingModal: React.FC<Props> = (props) => {
  const { user, children } = props;
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit } = useForm<inputData>();
  const { setSnackState } = useContext(SnackbarContext);
  const { mutate } = useSWRConfig();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column" as const,
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const signOutGoogle = async () => {
    try {
      await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      mutate("http://localhost:8000/user/loginUser");
      setSnackState({
        isOpen: true,
        status: "success",
        message: "ログアウトしました",
      });
    } catch (err) {
      setSnackState({
        isOpen: true,
        status: "error",
        message: "ログアウトに失敗しました",
      });
    }
  };

  const postDataForm: SubmitHandler<inputData> = (data) => {
    //何も変更していなければundefinedが送られてくる
    if (true) {
      console.log(data);
      return;
    }
    fetch("http://localhost:8000/post/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        mutate("http://localhost:8000/post/all");
        setSnackState({
          isOpen: true,
          status: "success",
          message: "success!!",
        });
        setOpen(false);
      })
      .catch((error) => {
        setSnackState({ isOpen: true, status: "error", message: "error" });
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        sx={{ mb: 4, ml: "auto", color: "white", display: "block" }}
      >
        {children}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(postDataForm)}>
          <Box sx={style}>
            <Controller
              name="userName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="USERNAME"
                  fullWidth
                  defaultValue={user?.userId}
                  sx={{ mb: 2 }}
                />
              )}
              control={control}
            />
            <Controller
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="NAME"
                  fullWidth
                  defaultValue={user?.name}
                />
              )}
              control={control}
            />
            <IconButton color="primary" type="submit">
              <ChangeCircleIcon fontSize="large" />
            </IconButton>
            <Button
              sx={{
                mt: 1.5,
                mx: "auto",
                color: "white",
                backgroundColor: "primary.dark",
                textAlign: "center",
              }}
              onClick={signOutGoogle}
            >
              LOG OUT
            </Button>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};
