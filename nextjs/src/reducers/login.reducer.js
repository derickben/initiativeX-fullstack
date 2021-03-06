import {
  CURRENT_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_FAILED,
  LOGIN_FAILED_NETWORK,
  REGISTER_FAILED,
  REGISTER_FAILED_NETWORK,
  CLOSE_SNACKBAR,
  SET_LOADING_GET_CURRENT_USER,
  SET_LOADING_LOGIN,
  SET_LOADING_REGISTER,
} from "src/actions/types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_GET_CURRENT_USER:
      return { ...state, loading: { ...state.loading, currentUser: true } };

    case SET_LOADING_LOGIN:
      return { ...state, loading: { ...state.loading, loginLoading: true } };

    case SET_LOADING_REGISTER:
      return { ...state, loading: { ...state.loading, registerLoading: true } };

    case CLOSE_SNACKBAR:
      return { ...state, snackbarOpen: false };

    case CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
        loading: { ...state.loading, currentUser: false },
      };

    case LOGIN_USER:
      return {
        ...state,
        snackbarOpen: true,
        error: { ...state.error, loginError: null },
        success: {
          ...state.success,
          loginSuccess: {
            alertMessage: "Login successful!",
            severityValue: "success",
          },
        },
        loading: { ...state.loading, loginLoading: false },
      };

    case LOGIN_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          ...state.error,
          loginError: {
            alertMessage: action.payload,
            severityValue: "error",
          },
        },
        success: {
          ...state.success,
          loginSuccess: null,
        },
        loading: { ...state.loading, loginLoading: false },
      };

    case LOGIN_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          ...state.error,
          loginError: {
            alertMessage: "Network Error",
            severityValue: "error",
          },
        },
        success: {
          ...state.success,
          loginSuccess: null,
        },
        loading: { ...state.loading, loginLoading: false },
      };

    case REGISTER_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          ...state.error,
          registerError: {
            alertMessage: action.payload,
            severityValue: "error",
          },
        },
        success: {
          ...state.success,
          registerSuccess: null,
        },
        loading: { ...state.loading, registerLoading: false },
      };

    case REGISTER_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        error: {
          ...state.error,
          registerError: {
            alertMessage: "Network Error",
            severityValue: "error",
          },
        },
        success: {
          ...state.success,
          registerSuccess: null,
        },
        loading: { ...state.loading, registerLoading: false },
      };

    case REGISTER_USER:
      return {
        ...state,
        snackbarOpen: true,
        error: { ...state.error, registerError: null },
        success: {
          ...state.success,
          registerSuccess: {
            alertMessage: "Registration successful!",
            severityValue: "success",
          },
        },
        loading: { ...state.loading, registerLoading: false },
      };

    default:
      return state;
  }
};

export default LoginReducer;
