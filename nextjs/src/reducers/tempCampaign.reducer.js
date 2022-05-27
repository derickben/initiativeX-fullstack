import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
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
        loading: { ...state.loading, saveBasics: !state.loading.saveBasics },
      };

    case ADD_TEMP_CAMPAIGN:
      return { ...state };

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
