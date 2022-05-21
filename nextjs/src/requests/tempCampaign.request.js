import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
} from "src/actions/types";

// GET TEMPORARY CAMPAIGN OF CURRENT USER
export const getTempCampaignRequest = async (dispatch, userId) => {
  // Make axios get request to get the temporary campaign and send to reducer
  try {
    const response = await axios.get(
      `${API_URL}/campaigns-temp/${userId}`,
      { withCredentials: true },
      AXIOS_OPTION()
    );
    dispatch({ type: GET_TEMP_CAMPAIGN, payload: response.data.data });
    console.log("Get Temp Camp:", response.data.data);
  } catch (error) {
    console.log(error);
  }
};

// CREATE TEMPORARY CAMPAIGN
export const addTempCampaignRequest = async (dispatch, formData) => {
  // Make axios post request to create or update a temporary campaign
  try {
    console.log("formData", formData);
    const response = await axios.post(
      `${API_URL}/campaigns-temp`,
      formData,
      { withCredentials: true },
      AXIOS_OPTION("multipath/form-data")
    );
    dispatch(SET_LOADING_ADD_TEMP_CAMPAIGN);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE TEMPORARY CAMPAIGN
export const updateTempCampaignRequest = (dispatch) => {
  // Make axios put request to update a temporary campaign
};

// DELETE TEMPORARY CAMPAIGN
export const deleteTempCampaignRequest = (dispatch) => {
  // Make axios delete request to delete a temporary campaign
};
