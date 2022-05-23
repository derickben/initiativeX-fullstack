import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import { CURRENT_USER, CURRENT_USER_NULL } from "src/actions/types";

// Login post request
export const loginRequest = async (
  loginDetails,
  setLoading,
  setError,
  setSuccess,
  setSnackbarOpen
) => {
  try {
    // Set loading to true
    setLoading(true);

    // Make axios post request to login
    const response = await axios.post(
      `${API_URL}/auth/login`,
      loginDetails,
      AXIOS_OPTION()
    );

    document.cookie = `token=${response.data.token}; SameSite=None; Secure;`;
    setError(null);

    // Set success in UI message
    setSnackbarOpen(true);
    setSuccess({
      alertMessage: "Login successful!",
      severityValue: "success",
    });

    // Set Loading False
    setLoading(false);
  } catch (error) {
    // Set Loading False
    setLoading(false);
    // Set error message in UI
    setSnackbarOpen(true);

    setSuccess(null);
    if (error?.response?.data?.success === false) {
      setError({
        alertMessage: error.response.data.error,
        severityValue: "error",
      });
    } else {
      setError({
        alertMessage: "Network Error",
        severityValue: "error",
      });
    }
  }
};

// Register Post request
export const registerRequest = async (
  registerDetails,
  setLoading,
  setError,
  setSuccess,
  setSnackbarOpen
) => {
  try {
    // Set loading to true
    setLoading(true);

    // Make axios post request to register
    const response = await axios.post(
      `${API_URL}/auth/register`,
      registerDetails,
      AXIOS_OPTION()
    );

    document.cookie = `token=${response.data.token}; SameSite=None; Secure;`;
    setError(null);
    setSnackbarOpen(true);
    setSuccess({
      alertMessage: "Registration successful!",
      severityValue: "success",
    });

    // Set Loading False
    setLoading(false);
  } catch (error) {
    // Set Loading False
    setLoading(false);
    // Set error message in UI
    setSnackbarOpen(true);

    setSuccess(null);
    if (error?.response?.data?.success === false) {
      setError({
        alertMessage: error.response.data.error,
        severityValue: "error",
      });
    }
  }
};

// GET CURRENT USER
export const currentUserRequest = async (dispatch) => {
  // Make axios get request to get the current user
  try {
    const res = await axios.get(
      `${API_URL}/auth/me`,
      { withCredentials: true },
      AXIOS_OPTION()
    );
    dispatch({ type: CURRENT_USER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: CURRENT_USER_NULL });
    console.log(error.response.statusText);
  }
};
