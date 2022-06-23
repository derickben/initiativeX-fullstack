import { useReducer } from "react";
import {
  ADD_TEMP_CAMPAIGN,
  EDIT_TEMP_CAMPAIGN,
  SET_LOADING_GET_ALL_ITEMS,
  SET_LOADING_GET_ALL_SHIPPING,
  SET_LOADING_FAQ,
  SET_LOADING_GET_TEMP_CAMPAIGN,
  SET_LOADING_ADD_TEMP_CAMPAIGN,
  TEMP_CAMPAIGN_CLOSE_SNACKBAR,
  SET_LOADING_PERK,
  SET_LOADING_ITEM,
  SET_LOADING_SHIPPING,
} from "./types";
import {
  getTempCampaignRequest,
  getAllItemsFromAllPerksRequest,
  getAllShippingsFromAllPerksRequest,
  addTempCampaignRequest,
  addFaqToTempCampaignRequest,
  addPerkToTempCampaignRequest,
  addItemToTempCampaignRequest,
  addShipToTempCampaignRequest,
  updateFaqInTempCampaignRequest,
  deleteFaqInTempCampaignRequest,
  updateTempCampaignRequest,
  updatePerkInTempCampaignRequest,
  updateItemInTempCampaignRequest,
  updateShipInTempCampaignRequest,
  deletePerkInTempCampaignRequest,
  deleteItemInTempCampaignRequest,
  deleteShipInTempCampaignRequest,
  deleteTempCampaignRequest,
} from "src/requests/tempCampaign.request";
import TempCampaignContext from "src/context/tempCampaign.context";
import TempCampaignReducer from "src/reducers/tempCampaign.reducer";

const TempCampaignAction = (props) => {
  const campaignState = {
    tempCampaign: {},
    faqsFromContext: [],
    perksFromContext: [],
    itemsFromContext: [],
    allItems: [],
    shippingsFromContext: [],
    allShippings: [],
    error: null,
    success: null,
    snackbarOpen: false,
    loading: {
      getCampaign: false,
      getItems: false,
      getShippings: false,
      addVideo: false,
      saveBasics: false,
      photo: false,
      faq: false,
      perk: false,
      item: false,
      ship: false,
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

  // FAQ

  // ADD TO FAQ ARRAY
  const addFaqToTempCampaign = async (userId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_FAQ);

      // Make axios post request to add FAQ to temporary campaign
      await addFaqToTempCampaignRequest(userId, data, dispatch);
    }
  };

  // UPDATE FAQ IN ARRAY
  const updateFaqInTempCampaign = async (userId, faqId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_FAQ);

      // Make axios put request to update FAQ in temporary campaign
      await updateFaqInTempCampaignRequest(userId, faqId, data, dispatch);
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

  // PERKS

  // ADD TO PERK ARRAY
  const addPerkToTempCampaign = async (userId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_PERK);

      // Make axios post request to add PERK to temporary campaign
      await addPerkToTempCampaignRequest(userId, data, dispatch);

      // Call getTempCampaign
      // getTempCampaign(userId);
    }
  };

  // UPDATE PERK IN ARRAY
  const updatePerkInTempCampaign = async (userId, perkId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_PERK);

      // Make axios put request to update PERK in temporary campaign
      await updatePerkInTempCampaignRequest(userId, perkId, data, dispatch);

      // Call getTempCampaign
      // getTempCampaign(userId);
    }
  };

  // DELETE PERK IN ARRAY
  const deletePerkInTempCampaign = async (userId, perkId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_PERK);

      // Make axios delete request to remove PERK in temporary campaign
      await deletePerkInTempCampaignRequest(userId, perkId, dispatch);

      // Call getTempCampaign
      getTempCampaign(userId);
    }
  };

  // ITEMS

  // GET ALL ITEMS IN ALL PERKS OF CURRENT USER
  const getAllItemsFromAllPerks = async (userId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_GET_ALL_ITEMS);

      // Make axios get request to get all items from all perks
      getAllItemsFromAllPerksRequest(userId, dispatch);
    } else {
      return;
    }
  };

  // ADD TO ITEM IN PERK ARRAY
  const addItemToTempCampaign = async (userId, perkId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_ITEM);

      // Make axios post request to add ITEM to PERK ARRAY
      await addItemToTempCampaignRequest(userId, perkId, data, dispatch);

      // Call getAllItems
      getAllItemsFromAllPerks(userId);
    }
  };

  // UPDATE ITEM IN PERK ARRAY
  const updateItemInTempCampaign = async (userId, perkId, itemId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_ITEM);

      // Make axios put request to update ITEM in PERK ARRAY
      await updateItemInTempCampaignRequest(
        userId,
        perkId,
        itemId,
        data,
        dispatch
      );

      // Call getAllItems
      await getAllItemsFromAllPerks(userId);
    }
  };

  // DELETE ITEM IN PERK ARRAY
  const deleteItemInTempCampaign = async (userId, perkId, itemId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_ITEM);

      // Make axios delete request to remove ITEM from PERK ARRAY
      await deleteItemInTempCampaignRequest(userId, perkId, itemId, dispatch);

      // Call getAllItems
      getAllItemsFromAllPerks(userId);
    }
  };

  // SHIPPING

  // GET ALL SHIPPING IN ALL PERKS OF CURRENT USER
  const getAllShippingsFromAllPerks = async (userId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_GET_ALL_SHIPPING);

      // Make axios get request to get all shippings in a perk array
      getAllShippingsFromAllPerksRequest(userId, dispatch);
    } else {
      return;
    }
  };

  // ADD TO SHIPPING IN PERK ARRAY
  const addShipToTempCampaign = async (userId, perkId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_SHIPPING);

      // Make axios post request to add SHIPPING to PERK ARRAY
      await addShipToTempCampaignRequest(userId, perkId, data, dispatch);

      // Call getAllShippings
      getAllShippingsFromAllPerks(userId);
    }
  };

  // UPDATE SHIPPING IN PERK ARRAY
  const updateShipInTempCampaign = async (userId, perkId, shipId, data) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_SHIPPING);

      // Make axios put request to update SHIPPING in PERK ARRAY
      await updateShipInTempCampaignRequest(
        userId,
        perkId,
        shipId,
        data,
        dispatch
      );

      // Call getAllShippings
      getAllShippingsFromAllPerks(userId);
    }
  };

  // DELETE SHIPPING IN PERK ARRAY
  const deleteShipInTempCampaign = async (userId, perkId, shipId) => {
    if (userId) {
      // Set loading to true
      setLoading(SET_LOADING_SHIPPING);

      // Make axios delete request to remove SHIPPING from PERK ARRAY
      await deleteShipInTempCampaignRequest(userId, perkId, shipId, dispatch);

      // Call getAllShippings
      getAllShippingsFromAllPerks(userId);
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
        getAllItemsFromAllPerks,
        getAllShippingsFromAllPerks,
        addTempCampaign,
        updateTempCampaign,
        deleteTempCampaign,
        addFaqToTempCampaign,
        addPerkToTempCampaign,
        addItemToTempCampaign,
        addShipToTempCampaign,
        updateFaqInTempCampaign,
        updatePerkInTempCampaign,
        updateItemInTempCampaign,
        updateShipInTempCampaign,
        deleteFaqInTempCampaign,
        deletePerkInTempCampaign,
        deleteItemInTempCampaign,
        deleteShipInTempCampaign,
        closeSnackbar,
      }}
    >
      {props.children}
    </TempCampaignContext.Provider>
  );
};

export default TempCampaignAction;
