import { Box, Button, Modal } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { FC, useState } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center" as const,
};

export const LoginModal: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: "white" }}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="contained"
            href="http://localhost:8000/api/auth/google"
            startIcon={<GoogleIcon />}
          >
            Sign in with Google for Backend
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
