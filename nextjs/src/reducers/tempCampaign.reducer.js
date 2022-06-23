import {
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  TEMP_CAMPAIGN_CLOSE_SNACKBAR,
  GET_TEMP_CAMPAIGN,
  GET_ALL_ITEMS_FROM_ALL_PERKS,
  GET_ALL_SHIPPINGS_FROM_ALL_PERKS,
  ADD_FAQ_SUCCESS,
  ADD_PERK_SUCCESS,
  ADD_ITEM_SUCCESS,
  ADD_SHIP_SUCCESS,
  UPDATE_FAQ_SUCCESS,
  UPDATE_PERK_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  UPDATE_SHIP_SUCCESS,
  DELETE_FAQ_SUCCESS,
  DELETE_PERK_SUCCESS,
  DELETE_ITEM_SUCCESS,
  DELETE_SHIP_SUCCESS,
  ADD_TEMP_CAMPAIGN_SUCCESS,
  FAQ_FAILED,
  PERK_FAILED,
  ITEM_FAILED,
  SHIP_FAILED,
  FAQ_FAILED_NETWORK,
  PERK_FAILED_NETWORK,
  ITEM_FAILED_NETWORK,
  SHIP_FAILED_NETWORK,
  ADD_TEMP_CAMPAIGN_FAILED,
  ADD_TEMP_CAMPAIGN_FAILED_NETWORK,
  SET_LOADING_FAQ,
  SET_LOADING_PERK,
  SET_LOADING_ITEM,
  SET_LOADING_SHIPPING,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  SET_LOADING_GET_ALL_ITEMS,
  SET_LOADING_GET_ALL_SHIPPING,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
} from "src/actions/types";

const TempCampaignReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_GET_TEMP_CAMPAIGN:
      return {
        ...state,
        loading: { ...state.loading, getCampaign: !state.loading.getCampaign },
      };

    case SET_LOADING_GET_ALL_ITEMS:
      return {
        ...state,
        loading: { ...state.loading, getItems: !state.loading.getItems },
      };

    case SET_LOADING_GET_ALL_SHIPPING:
      return {
        ...state,
        loading: {
          ...state.loading,
          getShippings: !state.loading.getShippings,
        },
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

    case SET_LOADING_ITEM:
      return {
        ...state,
        loading: { ...state.loading, item: true },
      };

    case SET_LOADING_SHIPPING:
      return {
        ...state,
        loading: { ...state.loading, ship: true },
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

    // ITEM
    case GET_ALL_ITEMS_FROM_ALL_PERKS:
      return {
        ...state,
        itemsFromContext: [...action.payload.data.itemsInAllPerks],
        allItems: [...action.payload.data.allItems],
        loading: { ...state.loading, getItems: false },
      };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        itemsFromContext: [...action.payload.data.itemsInAllPerks],
        allItems: [...action.payload.data.allItems],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, item: false },
      };

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        itemsFromContext: [
          ...state.itemsFromContext,
          action.payload.data.updatedItem,
        ],
        allItems: [...action.payload.data.allItems],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, item: false },
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, item: false },
      };

    case ITEM_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: action.payload,
          severityValue: "error",
        },
        loading: { ...state.loading, item: false },
      };

    case ITEM_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: "Network Error",
          severityValue: "error",
        },
        loading: { ...state.loading, item: false },
      };

    // SHIPPING
    case GET_ALL_SHIPPINGS_FROM_ALL_PERKS:
      return {
        ...state,
        shippingsFromContext: [...action.payload.data.shippingsInAllPerks],
        allShippings: [...action.payload.data.allShippings],
        loading: { ...state.loading, getShippings: false },
      };

    case ADD_SHIP_SUCCESS:
      return {
        ...state,
        shippingsFromContext: [...action.payload.data.shippingsInAllPerks],
        allShippings: [...action.payload.data.allShippings],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, ship: false },
      };

    case UPDATE_SHIP_SUCCESS:
      return {
        ...state,
        shippingsFromContext: [
          ...state.shippingsFromContext,
          action.payload.data.updatedShipping,
        ],
        allShippings: [...action.payload.data.allShippings],
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, ship: false },
      };

    case DELETE_SHIP_SUCCESS:
      return {
        ...state,
        snackbarOpen: true,
        error: null,
        success: {
          alertMessage: action.payload.message,
          severityValue: "success",
        },
        loading: { ...state.loading, ship: false },
      };

    case SHIP_FAILED:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: action.payload,
          severityValue: "error",
        },
        loading: { ...state.loading, ship: false },
      };

    case SHIP_FAILED_NETWORK:
      return {
        ...state,
        snackbarOpen: true,
        success: null,
        error: {
          alertMessage: "Network Error",
          severityValue: "error",
        },
        loading: { ...state.loading, ship: false },
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
