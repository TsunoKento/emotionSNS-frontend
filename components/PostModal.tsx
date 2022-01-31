import {
  Alert,
  AlertColor,
  Box,
  Button,
  Checkbox,
  IconButton,
  Modal,
  Snackbar,
  TextField,
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
  emotions: number[];
};

export const PostModal: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, resetField } = useForm();
  const [checkList, setCheckList] = React.useState<number[]>([]);
  const [severity, setSeverity] = React.useState<AlertColor>("success");
  const [content, setContent] = React.useState<string>();
  const [snackOpen, setSnackOpen] = React.useState(false);
  const snackClose = () => {
    setSnackOpen(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCheckList([]);
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

  const handleCheck = (e: React.ChangeEvent) => {
    const value = Number((e.target as HTMLInputElement).value);
    if ((e.target as HTMLInputElement).checked) {
      setCheckList([...checkList, Number(value)]);
    } else {
      setCheckList(checkList.filter((item) => item !== value));
    }
  };

  const postDataForm: SubmitHandler<inputData> = (data) => {
    data["emotions"] = checkList;
    fetch("http://localhost:8000/post/add", {
      method: "POST",
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
                name="emotions"
                render={({ field }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={<SentimentVerySatisfiedIcon />}
                      checkedIcon={
                        <SentimentVerySatisfiedIcon sx={{ color: "coral" }} />
                      }
                      value={1}
                      onChange={(e) => field.onChange(handleCheck(e))}
                    />
                    <Checkbox
                      icon={<SentimentVeryDissatisfiedIcon />}
                      checkedIcon={
                        <SentimentVeryDissatisfiedIcon sx={{ color: "red" }} />
                      }
                      value={2}
                      onChange={(e) => field.onChange(handleCheck(e))}
                    />
                    <Checkbox
                      icon={<SentimentDissatisfiedIcon />}
                      checkedIcon={
                        <SentimentDissatisfiedIcon sx={{ color: "blue" }} />
                      }
                      value={3}
                      onChange={(e) => field.onChange(handleCheck(e))}
                    />
                    <Checkbox
                      icon={<SentimentSatisfiedAltIcon />}
                      checkedIcon={
                        <SentimentSatisfiedAltIcon sx={{ color: "gold" }} />
                      }
                      value={4}
                      onChange={(e) => field.onChange(handleCheck(e))}
                    />
                  </React.Fragment>
                )}
                control={control}
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
