import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type inputData = {
  content: string;
  emotion: number;
};

export const PostModal: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, resetField } = useForm<inputData>();
  const [severity, setSeverity] = React.useState<AlertColor>("success");
  const [content, setContent] = React.useState<string>();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const snackClose = () => {
    setSnackOpen(false);
  };
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

  const postDataForm: SubmitHandler<inputData> = (data) => {
    //感情が選択されなかったときは無感情(id: 5)として扱う
    if (data.emotion == null) {
      data.emotion = 5;
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
        setSeverity("success");
        setContent("SUCCESS");
        setSnackOpen(true);
        resetField("content");
        resetField("emotion");
        setOpen(false);
      })
      .catch((error) => {
        setSeverity("error");
        setContent("ERROR");
        setSnackOpen(true);
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={snackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity}>{content}</Alert>
      </Snackbar>
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
            <Controller
              name="content"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-textarea"
                  label="投稿内容"
                  rows={8}
                  multiline
                  fullWidth
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
