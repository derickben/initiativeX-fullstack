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
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  ITEM_FAILED,
  ITEM_FAILED_NETWORK,
  ADD_ITEM_SUCCESS,
  ADD_SHIP_SUCCESS,
  SHIP_FAILED,
  SHIP_FAILED_NETWORK,
  UPDATE_SHIP_SUCCESS,
  DELETE_SHIP_SUCCESS,
  SET_LOADING_GET_ALL_SHIPPING,
  SET_LOADING_GET_ALL_ITEMS,
  GET_ALL_ITEMS_FROM_ALL_PERKS,
  GET_ALL_SHIPPINGS_FROM_ALL_PERKS,
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
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}`,
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

// ITEMS

// GET ALL ITEMS IN ALL PERKS OF CURRENT USER
export const getAllItemsFromAllPerksRequest = async (userId, dispatch) => {
  // Make axios get request to get all items in a perk array and send to reducer
  try {
    const response = await axios.get(
      `${API_URL}/campaigns-temp/${userId}/perk/all/items`,
      { withCredentials: true },
      AXIOS_OPTION()
    );
    dispatch({
      type: GET_ALL_ITEMS_FROM_ALL_PERKS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: SET_LOADING_GET_ALL_ITEMS });
    console.log(error);
  }
};

// ADD TO ITEM to PERK ARRAY
export const addItemToTempCampaignRequest = async (
  userId,
  perkId,
  data,
  dispatch
) => {
  // Make axios post request to add ITEM to PERK ARRAY
  try {
    const response = await axios.post(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/item`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: ADD_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: ITEM_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: ITEM_FAILED_NETWORK });
    }
  }
};

// UPDATE ITEM IN PERK ARRAY
export const updateItemInTempCampaignRequest = async (
  userId,
  perkId,
  itemId,
  data,
  dispatch
) => {
  // Make axios put request to update ITEM in PERK ARRAY
  try {
    const response = await axios.put(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/item/${itemId}`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: UPDATE_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: ITEM_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: ITEM_FAILED_NETWORK });
    }
  }
};

// DELETE ITEM IN PERK ARRAY
export const deleteItemInTempCampaignRequest = async (
  userId,
  perkId,
  itemId,
  dispatch
) => {
  // Make axios delete request to remove ITEM from PERK ARRAY
  try {
    const response = await axios.delete(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/item/${itemId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: DELETE_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: ITEM_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: ITEM_FAILED_NETWORK });
    }
  }
};

// SHIPPING

// GET ALL SHIPPING IN ALL PERKS OF CURRENT USER
export const getAllShippingsFromAllPerksRequest = async (userId, dispatch) => {
  // Make axios get request to get all shippings in a perk array and send to reducer
  try {
    const response = await axios.get(
      `${API_URL}/campaigns-temp/${userId}/perk/all/shippings`,
      { withCredentials: true },
      AXIOS_OPTION()
    );
    dispatch({
      type: GET_ALL_SHIPPINGS_FROM_ALL_PERKS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: SET_LOADING_GET_ALL_SHIPPING });
    console.log(error);
  }
};

// ADD TO SHIPPING IN PERK ARRAY
export const addShipToTempCampaignRequest = async (
  userId,
  perkId,
  data,
  dispatch
) => {
  // Make axios post request to add SHIPPING to PERK ARRAY
  try {
    const response = await axios.post(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/shipping`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: ADD_SHIP_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: SHIP_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: SHIP_FAILED_NETWORK });
    }
  }
};

// UPDATE SHIPPING IN PERK ARRAY
export const updateShipInTempCampaignRequest = async (
  userId,
  perkId,
  shipId,
  data,
  dispatch
) => {
  // Make axios put request to update SHIPPING in PERK ARRAY
  try {
    const response = await axios.put(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/shipping/${shipId}`,
      data,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: UPDATE_SHIP_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: SHIP_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: SHIP_FAILED_NETWORK });
    }
  }
};

// DELETE SHIPPING IN PERK ARRAY
export const deleteShipInTempCampaignRequest = async (
  userId,
  perkId,
  shipId,
  dispatch
) => {
  // Make axios delete request to remove SHIPPING from PERK ARRAY
  try {
    const response = await axios.delete(
      `${API_URL}/campaigns-temp/${userId}/perk/${perkId}/shipping/${shipId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );

    dispatch({ type: DELETE_SHIP_SUCCESS, payload: response.data });
  } catch (error) {
    if (error?.response?.data?.success === false) {
      dispatch({
        type: SHIP_FAILED,
        payload: error.response.data.error,
      });
    } else {
      dispatch({ type: SHIP_FAILED_NETWORK });
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
