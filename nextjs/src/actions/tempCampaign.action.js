import { useReducer } from "react";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
} from "./types";
import {
  getTempCampaignRequest,
  addTempCampaignRequest,
  updateTempCampaignRequest,
  deleteTempCampaignRequest,
} from "src/requests/tempCampaign.request";
import TempCampaignContext from "src/context/tempCampaign.context";
import TempCampaignReducer from "src/reducers/tempCampaign.reducer";

const TempCampaignAction = (props) => {
  const campaignState = {
    tempCampaign: {},
    loading: {
      getCampaign: false,
      addVideo: false,
      saveBasics: false,
      photo: false,
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
  const addTempCampaign = async (
    userId,
    data,
    photo,
    setError,
    setSuccess,
    setSnackbarOpen
  ) => {
    if (userId) {
      // Set Loading to true
      setLoading(SET_LOADING_ADD_TEMP_CAMPAIGN);

      // Convert data into Form Data
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      // Make axios post request to create or update a temporary campaign
      await addTempCampaignRequest(
        data,
        photo,
        setError,
        setSuccess,
        setSnackbarOpen,
        dispatch
      );

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

  return (
    <TempCampaignContext.Provider
      value={{
        ...state,
        setLoading,
        getTempCampaign,
        addTempCampaign,
        updateTempCampaign,
        deleteTempCampaign,
      }}
    >
      {props.children}
    </TempCampaignContext.Provider>
  );
};

export default TempCampaignAction;
