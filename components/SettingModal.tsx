import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useSWRConfig } from "swr";
import { LoginUser } from "../types/loginUser";
import { useRouter } from "next/router";

type inputData = {
  userId: string;
  name: string;
};

type Props = {
  user: LoginUser | undefined;
};

export const SettingModal: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, children } = props;
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<inputData>();
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
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const signOutGoogle = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      mutate(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/user/loginUser`);
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
    setIsLoading(true);

    type req = {
      image?: string;
      name: string;
      userId: string;
      isUserIdChanged: boolean;
    };
    const reqData: req = {
      name: data.name,
      userId: data.userId,
      isUserIdChanged: data.userId !== user?.userId,
    };
    if (fileUrl) {
      reqData.image = fileUrl.replace(/data:.*\/.*;base64,/, "");
    }
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/user/profile/change`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => {
        mutate(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/user/loginUser`);
        setSnackState({
          isOpen: true,
          status: "success",
          message: "success!!",
        });
        setOpen(false);
        //formにdafaultvalueを設定した都合上返却値が全て303になっているのを修正する
        if (response.status == 303) {
          return response.json();
        } else {
          mutate(
            `${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/user/getUser/${user?.userId}`
          );
        }
        if (!response.ok) {
          throw new Error();
        }
      })
      .then((data) => {
        if (data) {
          router.replace(data);
        }
      })
      .catch(() => {
        setSnackState({ isOpen: true, status: "error", message: "error" });
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

            {errors.userId && errors.userId.type === "required" && (
              <span style={{ color: "red" }}>{errors.userId.message}</span>
            )}
            {errors.userId && errors.userId.type === "maxLength" && (
              <span style={{ color: "red" }}>IDは30文字までです</span>
            )}
            <Controller
              name="userId"
              rules={{
                required: "IDの入力は必須です",
                maxLength: 50,
              }}
              render={({ field }) => (
                <TextField {...field} label="ID" fullWidth sx={{ mb: 2 }} />
              )}
              control={control}
              defaultValue={user?.userId}
            />

            {errors.name && <span>{errors.name.message}</span>}
            <Controller
              name="name"
              rules={{ required: "NAMEの入力は必須です" }}
              render={({ field }) => (
                <TextField {...field} label="NAME" fullWidth sx={{ mb: 2 }} />
              )}
              control={control}
              defaultValue={user?.name}
            />
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button color="primary" type="submit" variant="contained">
                変更
              </Button>
            )}
            <Button
              sx={{
                mt: 1.5,
                mx: "auto",
                color: "white",
                backgroundColor: "red",
                textAlign: "center",
              }}
              onClick={signOutGoogle}
            >
              ログアウト
            </Button>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};
