import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import {
  GET_TEMP_CAMPAIGN,
  FAQ_FAILED,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  ADD_TEMP_CAMPAIGN_FAILED,
  ADD_TEMP_CAMPAIGN_FAILED_NETWORK,
  ADD_TEMP_CAMPAIGN_SUCCESS,
  ADD_FAQ_SUCCESS,
  UPDATE_FAQ_SUCCESS,
  DELETE_FAQ_SUCCESS,
  FAQ_FAILED_NETWORK,
  ADD_PERK_SUCCESS,
  PERK_FAILED,
  PERK_FAILED_NETWORK,
  UPDATE_PERK_SUCCESS,
  DELETE_PERK_SUCCESS,
} from "src/actions/types";

// GET TEMPORARY CAMPAIGN OF CURRENT USER
export const getTempCampaignRequest = async (userId, dispatch) => {
  // Make axios get request to get the temporary campaign and send to reducer
  try {
    const response = await axios.get(
      `${API_URL}/campaigns-temp/${userId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );
    dispatch({ type: GET_TEMP_CAMPAIGN, payload: response.data.data });
  } catch (error) {
    dispatch({ type: SET_LOADING_GET_TEMP_CAMPAIGN });
    console.log(error);
  }
};

// CREATE TEMPORARY CAMPAIGN
export const addTempCampaignRequest = async (data, photo = {}, dispatch) => {
  // Make axios post request to create or update a temporary campaign
  try {
    // Post request to save image which returns file path

    // Add file path as path of req.body to create a temporary campaign

    let imageURL = null;

    if (photo.name) {
      const formData = new FormData();

      formData.append("photo", photo);
      formData.append("extraPath", "campaign");

      imageURL = await axios.post(
        `${API_URL}/uploads`,
        formData,
        { withCredentials: true },
        AXIOS_OPTION(photo.type)
      );
    }

    const response = await axios.post(
      `${API_URL}/campaigns-temp`,
      { ...data, photo: imageURL?.data?.data },
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: ADD_TEMP_CAMPAIGN_SUCCESS });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: ADD_TEMP_CAMPAIGN_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: ADD_TEMP_CAMPAIGN_FAILED_NETWORK });
    }
  }
};

// FAQ

// ADD TO FAQ ARRAY
export const addFaqToTempCampaignRequest = async (userId, data, dispatch) => {
  // Make axios post request to add FAQ to temporary campaign
  try {
    const response = await axios.post(
      `${API_URL}/campaigns-temp/${userId}/faq`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: ADD_FAQ_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: FAQ_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: FAQ_FAILED_NETWORK });
    }
  }
};

// UPDATE FAQ IN ARRAY
export const updateFaqInTempCampaignRequest = async (
  userId,
  faqId,
  data,
  dispatch
) => {
  // Make axios put request to update FAQ in temporary campaign
  try {
    const response = await axios.put(
      `${API_URL}/campaigns-temp/${userId}/faq/${faqId}`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: UPDATE_FAQ_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: FAQ_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: FAQ_FAILED_NETWORK });
    }
  }
};

// DELETE FAQ IN ARRAY
export const deleteFaqInTempCampaignRequest = async (
  userId,
  faqId,
  dispatch
) => {
  // Make axios delete request to update FAQ in temporary campaign
  try {
    const response = await axios.delete(
      `${API_URL}/campaigns-temp/${userId}/faq/${faqId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: DELETE_FAQ_SUCCESS, payload: response.data.message });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: FAQ_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: FAQ_FAILED_NETWORK });
    }
  }
};

// PERKS
// ADD TO PERK ARRAY
export const addPerkToTempCampaignRequest = async (userId, data, dispatch) => {
  // Make axios post request to add FAQ to temporary campaign
  try {
    const response = await axios.post(
      `${API_URL}/campaigns-temp/${userId}/perk`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: ADD_PERK_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: PERK_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: PERK_FAILED_NETWORK });
    }
  }
};

// UPDATE PERK IN ARRAY
export const updatePerkInTempCampaignRequest = async (
  userId,
  perkId,
  data,
  dispatch
) => {
  // Make axios put request to update FAQ in temporary campaign
  try {
    const response = await axios.put(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: UPDATE_PERK_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: PERK_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: PERK_FAILED_NETWORK });
    }
  }
};

// DELETE PERK IN ARRAY
export const deletePerkInTempCampaignRequest = async (
  userId,
  perkId,
  dispatch
) => {
  // Make axios delete request to update PERK in temporary campaign
  try {
    const response = await axios.delete(
      `${API_URL}/campaigns-temp/${userId}/faq/${perkId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: DELETE_PERK_SUCCESS, payload: response.data.message });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: PERK_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: PERK_FAILED_NETWORK });
    }
  }
};

// UPDATE TEMPORARY CAMPAIGN
export const updateTempCampaignRequest = async (dispatch) => {
  // Make axios put request to update a temporary campaign
};

// DELETE TEMPORARY CAMPAIGN
export const deleteTempCampaignRequest = async (dispatch) => {
  // Make axios delete request to delete a temporary campaign
};
