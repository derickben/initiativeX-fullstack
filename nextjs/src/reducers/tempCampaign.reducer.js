import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  TEMP_CAMPAIGN_CLOSE_SNACKBAR,
  GET_TEMP_CAMPAIGN,
  ADD_TEMP_CAMPAIGN_SUCCESS,
  ADD_TEMP_CAMPAIGN_FAILED,
  ADD_TEMP_CAMPAIGN_FAILED_NETWORK,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
} from "src/actions/types";

const TempCampaignReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_GET_TEMP_CAMPAIGN:
      return {
        ...state,
        loading: { ...state.loading, getCampaign: !state.loading.getCampaign },
      };

    case SET_LOADING_ADD_TEMP_CAMPAIGN:
      return {
        ...state,
        loading: { ...state.loading, saveBasics: true },
      };

    case TEMP_CAMPAIGN_CLOSE_SNACKBAR:
      return { ...state, snackbarOpen: false };

    case ADD_TEMP_CAMPAIGN_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: "Saved successfully",
          severityValue: "success",
        },
        loading: { ...state.loading, saveBasics: false },
      };

    case ADD_TEMP_CAMPAIGN_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: action.payload,
          severityValue: "error",
        },
        loading: { ...state.loading, saveBasics: false },
      };

    case ADD_TEMP_CAMPAIGN_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: "Network Error",
          severityValue: "error",
        },
        loading: { ...state.loading, saveBasics: false },
      };

    case GET_TEMP_CAMPAIGN:
      return {
        ...state,
        tempCampaign: action.payload,
        loading: { ...state.loading, getCampaign: false },
      };

    case EDIT_TEMP_CAMPAIGN:
      return { ...state };

    case DELETE_TEMP_CAMPAIGN:
      return { ...state };

    default:
      return state;
  }
};

export default TempCampaignReducer;
