import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import React, { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useSWRConfig } from "swr";
import { LoginUser } from "../types/loginUser";
import { useRouter } from "next/router";

type inputData = {
  userName: string;
  name: string;
};

type Props = {
  user: LoginUser | undefined;
};

export const SettingModal: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, children } = props;
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit } = useForm<inputData>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { setSnackState } = useContext(SnackbarContext);
  const { mutate } = useSWRConfig();
  const router = useRouter();
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
    setIsLoading(true);
    type req = {
      image?: string;
      name?: string;
      userId?: string;
    };
    const reqData: req = {
      name: data.name,
      userId: data.userName,
    };
    if (fileUrl) {
      reqData.image = fileUrl.replace(/data:.*\/.*;base64,/, "");
    }
    fetch("http://localhost:8000/user/profile/change", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => {
        if (response.status == 303) {
          mutate(`http://localhost:8000/user/getUser/${user?.userId}`);
          mutate("http://localhost:8000/user/loginUser");
          setSnackState({
            isOpen: true,
            status: "success",
            message: "success!!",
          });
          setOpen(false);
          return response.json();
        }
        if (!response.ok) {
          throw new Error();
        }
        mutate(`http://localhost:8000/user/getUser/${user?.userId}`);
        setSnackState({
          isOpen: true,
          status: "success",
          message: "success!!",
        });
        setOpen(false);
      })
      .then((data) => {
        console.log(data);
        router.replace(data);
      })
      .catch((error) => {
        setSnackState({ isOpen: true, status: "error", message: "error" });
        console.log(error);
      });
    setIsLoading(false);
  };

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files != null ? event.target.files[0] : null;
    if (imageFile == null) return;
    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      img.onload = () => {
        const imgType = img.src.substring(5, img.src.indexOf(";"));
        const imgWidth = 200;
        const imgHeight = img.height * (imgWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, imgWidth, imgHeight);
        setFileUrl(canvas.toDataURL(imgType));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        sx={{
          position: "absolute",
          right: 20,
          color: "white",
          display: "block",
        }}
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
            <Box sx={{ mx: "auto", mb: 5 }}>
              <input
                type="file"
                accept="image/*"
                id="avatar-image"
                style={{ display: "none" }}
                onChange={(e) => {
                  imageChange(e);
                }}
              ></input>
              <label htmlFor="avatar-image">
                <Avatar
                  src={fileUrl || user?.image}
                  sx={{ width: 100, height: 100 }}
                />
              </label>
            </Box>

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
                  sx={{ mb: 2 }}
                />
              )}
              control={control}
            />
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <IconButton color="primary" type="submit">
                <ChangeCircleIcon fontSize="large" />
              </IconButton>
            )}
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
