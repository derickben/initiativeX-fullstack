import { forwardRef, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar(props) {
  const { toggleSnackbar, closeSnackbar, errorMessage, successMessage } = props;
  const handleClose = () => {
    closeSnackbar();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={toggleSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            errorMessage?.severityValue || successMessage?.severityValue
          }
          sx={{ width: "100%" }}
        >
          {errorMessage?.alertMessage || successMessage?.alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
