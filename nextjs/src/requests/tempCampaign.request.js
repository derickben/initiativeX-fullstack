import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";
import {
  GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
  SET_LOADING_GET_TEMP_CAMPAIGN,
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
    console.log("Get Temp Camp:", response.data.data);
  } catch (error) {
    dispatch({ type: SET_LOADING_GET_TEMP_CAMPAIGN });
    console.log(error);
  }
};

// CREATE TEMPORARY CAMPAIGN
export const addTempCampaignRequest = async (
  data,
  photo,
  setError,
  setSuccess,
  setSnackbarOpen,
  dispatch
) => {
  // Make axios post request to create or update a temporary campaign
  try {
    // Post request to save image which returns file path

    // Add file path as path of req.body to create a temporary campaign

    let imageURL = null;

    console.log("photo", photo);

    if (photo.name) {
      // Set loading to true for photo upload
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
    dispatch({ type: SET_LOADING_ADD_TEMP_CAMPAIGN });
    console.log(response.data);
    // Set success in UI message
    setError(null);

    // Set success in UI message
    setSnackbarOpen(true);
    setSuccess({
      alertMessage: "Saved successfully",
      severityValue: "success",
    });
  } catch (error) {
    // Set Loading False
    dispatch({ type: SET_LOADING_ADD_TEMP_CAMPAIGN });

    // Set error message in UI
    setSnackbarOpen(true);
    setSuccess(null);
    if (error?.response?.data?.success === false) {
      setError({
        alertMessage: error.response.data.error,
        severityValue: "error",
      });
    } else {
      setError({
        alertMessage: "Network Error",
        severityValue: "error",
      });
    }
    console.log(error?.response?.data);
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
