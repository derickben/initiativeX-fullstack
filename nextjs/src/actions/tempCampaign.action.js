import { useReducer } from "react";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_TEMP_CAMPAIGN,
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
    title: "",
    photo: "",
    desc: "",
    category: "",
    tags: [],
    videoLink: "",
    amountNeeded: 0,
    faq: [],
    duration: "",
    perks: [],
    loading: {
      addVideo: false,
      saveBasics: false,
      saveContent: false,
      savePerks: false,
      update: false,
    },
  };

  const [state, dispatch] = useReducer(TempCampaignReducer, campaignState);

  // GET TEMPORARY CAMPAIGN OF CURRENT USER
  const getTempCampaign = async (userId) => {
    // Set loading to true
    setLoading(SET_LOADING_TEMP_CAMPAIGN);

    // Make axios get request to get the temporary campaign
    await getTempCampaignRequest(dispatch);
  };

  // CREATE TEMPORARY CAMPAIGN
  const addTempCampaign = async () => {
    // Set Loading to true

    // Make axios post request to create or update a temporary campaign
    await addTempCampaignRequest(dispatch);
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
    dispatch(type);
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
