import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import React, { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { useSWRConfig } from "swr";

type inputData = {
  content: string;
  emotion: number;
};

export const PostModal: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<inputData>();
  const { setSnackState } = useContext(SnackbarContext);
  const handleOpen = () => setOpen(true);
  const { mutate } = useSWRConfig();
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

  const postDataForm: SubmitHandler<inputData> = (data) => {
    //感情が選択されなかったときは無感情(id: 5)として扱う
    if (data.emotion == null) {
      data.emotion = 5;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/post/add`, {
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
        mutate(`${process.env.NEXT_PUBLIC_API_SERVER_DOMAIN}/post/all`);
        setSnackState({
          isOpen: true,
          status: "success",
          message: "success!!",
        });
        resetField("content");
        resetField("emotion");
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
        sx={{ my: 2, color: "white", display: "block" }}
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
            {errors.content && errors.content.type === "required" && (
              <span style={{ color: "red" }}>{errors.content.message}</span>
            )}
            {errors.content && errors.content.type === "maxLength" && (
              <span style={{ color: "red" }}>投稿内容は200文字までです</span>
            )}
            <Controller
              name="content"
              rules={{
                required: "投稿内容の入力は必須です",
                maxLength: 200,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-textarea"
                  label="投稿内容"
                  rows={8}
                  multiline
                  fullWidth
                  helperText={`${field.value.length}/200`}
                />
              )}
              control={control}
            />
            <Box>
              <Controller
                name="emotion"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ToggleButtonGroup
                    value={value}
                    exclusive
                    onChange={(e, value) => {
                      onChange(value);
                    }}
                    aria-label="感情"
                  >
                    <ToggleButton value={1} aria-label="happy">
                      <SentimentVerySatisfiedIcon sx={{ color: "coral" }} />
                    </ToggleButton>
                    <ToggleButton value={2} aria-label="angry">
                      <SentimentVeryDissatisfiedIcon sx={{ color: "red" }} />
                    </ToggleButton>
                    <ToggleButton value={3} aria-label="sad">
                      <SentimentDissatisfiedIcon sx={{ color: "blue" }} />
                    </ToggleButton>
                    <ToggleButton value={4} aria-label="funny">
                      <SentimentSatisfiedAltIcon sx={{ color: "gold" }} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Box>
            <IconButton color="primary" type="submit">
              <SendIcon fontSize="large" />
            </IconButton>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};
