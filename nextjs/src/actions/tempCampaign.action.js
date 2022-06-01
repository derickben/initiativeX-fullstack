import { useReducer } from "react";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_FAQ,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
  TEMP_CAMPAIGN_CLOSE_SNACKBAR,
} from "./types";
import {
  getTempCampaignRequest,
  addTempCampaignRequest,
  addFaqToTempCampaignRequest,
  updateFaqInTempCampaignRequest,
  deleteFaqInTempCampaignRequest,
  updateTempCampaignRequest,
  deleteTempCampaignRequest,
} from "src/requests/tempCampaign.request";
import TempCampaignContext from "src/context/tempCampaign.context";
import TempCampaignReducer from "src/reducers/tempCampaign.reducer";

const TempCampaignAction = (props) => {
  const campaignState = {
    tempCampaign: {},
    faqsFromContext: [],
    error: null,
    success: null,
    snackbarOpen: false,
    loading: {
      getCampaign: false,
      addVideo: false,
      saveBasics: false,
      photo: false,
      faq: false,
      saveContent: false,
      savePerks: false,
      update: false,
    },
  };

  const [state, dispatch] = useReducer(TempCampaignReducer, campaignState);

  // GET TEMPORARY CAMPAIGN OF CURRENT USER
  const getTempCampaign = async (userId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_GET_TEMP_CAMPAIGN);

      // Make axios get request to get the temporary campaign
      getTempCampaignRequest(userId, dispatch);
    } else {
      return;
    }
  };

  // CREATE TEMPORARY CAMPAIGN
  const addTempCampaign = async (userId, data, photo) => {
    if (userId) {
      // Set Loading to true
      setLoading(SET_LOADING_ADD_TEMP_CAMPAIGN);

      // Convert data into Form Data
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      // Make axios post request to create or update a temporary campaign
      await addTempCampaignRequest(data, photo, dispatch);

      // Call getTempCampaign
      getTempCampaign(userId);
    }
  };

  // ADD TO FAQ ARRAY
  const addFaqToTempCampaign = async (userId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_FAQ);

      // Make axios post request to add FAQ to temporary campaign
      await addFaqToTempCampaignRequest(userId, data, dispatch);

      // Call getTempCampaign
      getTempCampaign(userId);
    }
  };

  // UPDATE FAQ IN ARRAY
  const updateFaqInTempCampaign = async (userId, faqId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_FAQ);

      // Make axios put request to update FAQ in temporary campaign
      await updateFaqInTempCampaignRequest(userId, faqId, data, dispatch);

      // Call getTempCampaign
      getTempCampaign(userId);
    }
  };

  // DELETE FAQ IN ARRAY
  const deleteFaqInTempCampaign = async (userId, faqId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_FAQ);

      // Make axios delete request to remove FAQ in temporary campaign
      await deleteFaqInTempCampaignRequest(userId, faqId, dispatch);

      // Call getTempCampaign
      getTempCampaign(userId);
    }
  };

  // UPDATE TEMPORARY CAMPAIGN
  const updateTempCampaign = async () => {
    // Set Loading to true

    // Make axios put request to update a temporary campaign
    await updateTempCampaignRequest(dispatch);
  };

  // DELETE TEMPORARY CAMPAIGN
  const deleteTempCampaign = async () => {
    //Set Loading to true

    // Make axios delete request to delete a temporary campaign
    await deleteTempCampaignRequest(dispatch);
  };

  //  SET LOADING
  const setLoading = (type) => {
    dispatch({ type });
  };

  // CLOSE SNACKBAR
  const closeSnackbar = () => {
    dispatch({ type: TEMP_CAMPAIGN_CLOSE_SNACKBAR });
  };

  return (
    <TempCampaignContext.Provider
      value={{
        ...state,
        setLoading,
        getTempCampaign,
        addTempCampaign,
        updateTempCampaign,
        deleteTempCampaign,
        addFaqToTempCampaign,
        updateFaqInTempCampaign,
        deleteFaqInTempCampaign,
        closeSnackbar,
      }}
    >
      {props.children}
    </TempCampaignContext.Provider>
  );
};

export default TempCampaignAction;
