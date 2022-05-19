import { useState, useContext, useCallback } from "react";
import { API_URL } from "src/config";
import { loginRequest } from "src/requests/auth.request";
import LoginContext from "src/context/login.context";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ErrorSnackbar from "./ErrorSnackbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FormLogin() {
  const loginContext = useContext(LoginContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const loginDetails = {
      email: values.email,
      password: values.password,
    };

    await loginRequest(
      loginDetails,
      setLoading,
      setError,
      setSuccess,
      setSnackbarOpen
    );

    loginContext.getCurrentUser();
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      Login to your account
      <Stack spacing={2}>
        <Item elevation={5}>
          <Button fullWidth variant="contained" type="submit">
            Continue with Google
          </Button>
        </Item>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
          method="post"
          autoComplete="off"
          onSubmit={handleLoginSubmit}
          action={`${API_URL}/auth/login`}
        >
          <Stack spacing={2}>
            <Item>
              <FormControl fullWidth sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  value={values.email}
                  onChange={handleChange("email")}
                  aria-describedby="outlined-email-helper-text"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Email"
                  required
                />
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <LockIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  required
                />
              </FormControl>
            </Item>
            <Item elevation={5}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Sign In
              </Button>
            </Item>
          </Stack>
        </Box>
      </Stack>
      <ErrorSnackbar
        toggleSnackbar={snackbarOpen}
        closeSnackbar={closeSnackbar}
        errorMessage={error}
        successMessage={success}
      />
    </Box>
  );
}
