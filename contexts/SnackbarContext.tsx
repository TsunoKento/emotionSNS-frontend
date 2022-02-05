import { Alert, Snackbar } from "@mui/material";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

type Snacktype = {
  isOpen: boolean;
  status: "success" | "info" | "warning" | "error";
  message: string;
};

export const SnackbarContext = createContext(
  {} as {
    setSnackState: Dispatch<SetStateAction<Snacktype>>;
  }
);

export const SnackbarContextProvider: FC = ({ children }) => {
  const [snackState, setSnackState] = useState<Snacktype>({
    isOpen: false,
    status: "warning",
    message: "",
  });

  const snackClose = () => {
    setSnackState({ isOpen: false, status: snackState.status, message: "" });
  };

  return (
    <SnackbarContext.Provider value={{ setSnackState }}>
      <Snackbar
        open={snackState.isOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={snackClose}
      >
        <Alert severity={snackState.status}>{snackState.message}</Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
