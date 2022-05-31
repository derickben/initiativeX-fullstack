import { useReducer } from "react";
import {
  SET_LOADING_GET_CURRENT_USER,
  SET_LOADING_LOGIN,
  CLOSE_SNACKBAR,
  SET_LOADING_REGISTER,
} from "./types";
import {
  loginRequest,
  registerRequest,
  currentUserRequest,
} from "src/requests/auth.request";
import LoginContext from "src/context/login.context";
import LoginReducer from "src/reducers/login.reducer";

const LoginAction = (props) => {
  const loginState = {
    isAuthenticated: false,
    user: {},
    error: { loginError: null, registerError: null },
    success: { loginSuccess: null, registerSuccess: null },
    snackbarOpen: false,
    loading: {
      editUser: false,
      currentUser: false,
      loginLoading: false,
      registerLoading: false,
    },
  };

  const [state, dispatch] = useReducer(LoginReducer, loginState);

  // LOGIN ACTION
  const loginAction = async (loginDetails) => {
    // Set loading to true
    setLoading(SET_LOADING_LOGIN);

    // Make axios post request to login
    await loginRequest(loginDetails, dispatch);
  };

  // REGISTER ACTION
  const registerAction = async (registerDetails) => {
    // Set loading to true
    setLoading(SET_LOADING_REGISTER);

    // Make axios post request to login
    await registerRequest(registerDetails, dispatch);
  };

  // GET CURRENT USER
  const getCurrentUser = async () => {
    // Set loading to true
    setLoading(SET_LOADING_GET_CURRENT_USER);

    // Make axios get request to get the current user
    await currentUserRequest(dispatch);
  };

  //  SET LOADING
  const setLoading = (type) => {
    dispatch({ type });
  };

  // CLOSE SNACKBAR
  const closeSnackbar = () => {
    dispatch({ type: CLOSE_SNACKBAR });
  };

  return (
    <LoginContext.Provider
      value={{
        ...state,
        setLoading,
        closeSnackbar,
        loginAction,
        registerAction,
        getCurrentUser,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginAction;
