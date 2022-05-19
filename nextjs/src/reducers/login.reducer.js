import { CURRENT_USER, SET_LOADING_GET_CURRENT_USER } from "src/actions/types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_GET_CURRENT_USER:
      return { ...state, loading: { ...state.loading, currentUser: true } };

    case CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload },
        loading: { ...state.loading, currentUser: false },
      };

    default:
      return state;
  }
};

export default LoginReducer;
