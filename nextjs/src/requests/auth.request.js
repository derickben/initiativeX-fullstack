import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import {
  CURRENT_USER,
  CURRENT_USER_NULL,
  LOGIN_FAILED,
  REGISTER_FAILED,
  LOGIN_FAILED_NETWORK,
  REGISTER_FAILED_NETWORK,
  LOGIN_USER,
  REGISTER_USER,
} from "src/actions/types";

// Login post request
export const loginRequest = async (loginDetails, dispatch) => {
  try {
    // Make axios post request to login
    const response = await axios.post(
      `${API_URL}/auth/login`,
      loginDetails,
      AXIOS_OPTION()
    );

    document.cookie = `token=${response.data.token}; SameSite=None; Secure;`;
    dispatch({ type: LOGIN_USER, payload: response.data });

    // setError(null);

    // // Set success in UI message
    // setSnackbarOpen(true);
    // setSuccess({
    //   alertMessage: "Login successful!",
    //   severityValue: "success",
    // });

    // // Set Loading False
    // setLoading(false);
  } catch (error) {
    // Set Loading False
    // setLoading(false);
    // Set error message in UI
    // setSnackbarOpen(true);

    // setSuccess(null);
    if (error?.response?.data?.success === false) {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data.error });
    } else {
      dispatch({ type: LOGIN_FAILED_NETWORK });
    }
  }
};

// Register Post request
export const registerRequest = async (registerDetails, dispatch) => {
  try {
    // Make axios post request to register
    const response = await axios.post(
      `${API_URL}/auth/register`,
      registerDetails,
      AXIOS_OPTION()
    );

    document.cookie = `token=${response.data.token}; SameSite=None; Secure;`;

    dispatch({ type: REGISTER_USER });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({ type: REGISTER_FAILED, payload: error.response.data.error });
    } else {
      dispatch({ type: REGISTER_FAILED_NETWORK });
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
