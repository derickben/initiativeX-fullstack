import { useReducer } from "react";
import { SET_LOADING_GET_CURRENT_USER } from "./types";
import { currentUserRequest } from "src/requests/auth.request";
import LoginContext from "src/context/login.context";
import LoginReducer from "src/reducers/login.reducer";

const LoginAction = (props) => {
  const loginState = {
    isAuthenticated: false,
    user: {},
    loading: { editUser: false, currentUser: false },
  };

  const [state, dispatch] = useReducer(LoginReducer, loginState);

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

  return (
    <LoginContext.Provider value={{ ...state, setLoading, getCurrentUser }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginAction;
