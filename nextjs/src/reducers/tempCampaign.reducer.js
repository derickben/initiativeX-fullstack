import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_TEMP_CAMPAIGN,
} from "src/actions/types";

const TempCampaignReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING_TEMP_CAMPAIGN:
      return { ...state };

    case ADD_TEMP_CAMPAIGN:
      return { ...state };

    case GET_TEMP_CAMPAIGN:
      return { ...state };

    case EDIT_TEMP_CAMPAIGN:
      return { ...state };

    case DELETE_TEMP_CAMPAIGN:
      return { ...state };

    default:
      return state;
  }
};

export default TempCampaignReducer;
