import {
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  TEMP_CAMPAIGN_CLOSE_SNACKBAR,
  GET_TEMP_CAMPAIGN,
  ADD_FAQ_SUCCESS,
  ADD_PERK_SUCCESS,
  UPDATE_FAQ_SUCCESS,
  UPDATE_PERK_SUCCESS,
  DELETE_FAQ_SUCCESS,
  DELETE_PERK_SUCCESS,
  ADD_TEMP_CAMPAIGN_SUCCESS,
  FAQ_FAILED,
  PERK_FAILED,
  FAQ_FAILED_NETWORK,
  PERK_FAILED_NETWORK,
  ADD_TEMP_CAMPAIGN_FAILED,
  ADD_TEMP_CAMPAIGN_FAILED_NETWORK,
  SET_LOADING_FAQ,
  SET_LOADING_PERK,
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

    case SET_LOADING_FAQ:
      return {
        ...state,
        loading: { ...state.loading, faq: true },
      };

    case SET_LOADING_PERK:
      return {
        ...state,
        loading: { ...state.loading, perk: true },
      };

    case TEMP_CAMPAIGN_CLOSE_SNACKBAR:
      return { ...state, snackbarOpen: false };

    // FAQ
    case ADD_FAQ_SUCCESS:
      return {
        ...state,
        faqsFromContext: [...action.payload.data],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, faq: false },
      };

    case UPDATE_FAQ_SUCCESS:
      return {
        ...state,
        faqsFromContext: [...state.faqsFromContext, action.payload.data],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, faq: false },
      };

    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload,
          severityValue: "success",
        },
        loading: { ...state.loading, faq: false },
      };

    case FAQ_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: action.payload,
          severityValue: "error",
        },
        loading: { ...state.loading, faq: false },
      };

    case FAQ_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: "Network Error",
          severityValue: "error",
        },
        loading: { ...state.loading, faq: false },
      };

    //PERK
    case ADD_PERK_SUCCESS:
      return {
        ...state,
        perksFromContext: [...action.payload.data],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, perk: false },
      };

    case UPDATE_PERK_SUCCESS:
      return {
        ...state,
        perksFromContext: [...state.perksFromContext, action.payload.data],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, perk: false },
      };

    case DELETE_PERK_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload,
          severityValue: "success",
        },
        loading: { ...state.loading, perk: false },
      };

    case PERK_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: action.payload,
          severityValue: "error",
        },
        loading: { ...state.loading, perk: false },
      };

    case PERK_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: "Network Error",
          severityValue: "error",
        },
        loading: { ...state.loading, perk: false },
      };

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
        faqsFromContext: [...action.payload.faqs],
        perksFromContext: [...action.payload.perks],
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
