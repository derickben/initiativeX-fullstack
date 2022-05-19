import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  DELETE_TEMP_CAMPAIGN,
  GET_TEMP_CAMPAIGN,
  SET_LOADING_TEMP_CAMPAIGN,
} from "src/actions/types";

// GET TEMPORARY CAMPAIGN OF CURRENT USER
export const getTempCampaignRequest = (dispatch) => {
  // Make axios get request to get the temporary campaign
};

// CREATE TEMPORARY CAMPAIGN
export const addTempCampaignRequest = (dispatch) => {
  // Make axios post request to create or update a temporary campaign
};

// UPDATE TEMPORARY CAMPAIGN
export const updateTempCampaignRequest = (dispatch) => {
  // Make axios put request to update a temporary campaign
};

// DELETE TEMPORARY CAMPAIGN
export const deleteTempCampaignRequest = (dispatch) => {
  // Make axios delete request to delete a temporary campaign
};
