import { useState } from "react";
import Box from "@mui/material/Box";
import { API_URL } from "src/config";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
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
import { registerRequest } from "src/requests/auth.request";
import ErrorSnackbar from "./ErrorSnackbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FormRegister() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    passwordConfirm: "",
    showPasswordConfirm: false,
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

  const handleClickShowPasswordConfirm = () => {
    setValues({
      ...values,
      showPasswordConfirm: !values.showPasswordConfirm,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const registerDetails = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };

    await registerRequest(
      registerDetails,
      setLoading,
      setError,
      setSuccess,
      setSnackbarOpen
    );
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
          action={`${API_URL}/auth/register`}
        >
          <Stack spacing={2}>
            <Item>
              <FormControl fullWidth sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-firstName">
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  aria-describedby="outlined-firstName-helper-text"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="First Name"
                  required
                />
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-lastName">
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  aria-describedby="outlined-lastName-helper-text"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Last Name"
                  required
                />
              </FormControl>
            </Item>
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
            <Item>
              <FormControl fullWidth sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-passwordConfirm">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-passwordConfirm"
                  type={values.showPasswordConfirm ? "text" : "password"}
                  value={values.passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle passwordConfirm visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPasswordConfirm ? (
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
                  label="Confirm Password"
                  required
                />
              </FormControl>
            </Item>
            <Item elevation={5}>
              <Button fullWidth variant="contained" type="submit">
                Sign Up
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
