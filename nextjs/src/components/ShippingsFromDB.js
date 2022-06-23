import { useState, useEffect, useContext } from "react";
import TempCampaignContext from "src/context/tempCampaign.context";
import { Item } from "src/utility/styledComp";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ShippingUpdatePerkModal from "./ShippingUpdatePerkModal";

export default function ShippingsFromDB(props) {
  const tempCampaignContext = useContext(TempCampaignContext);
  const { updateShipInTempCampaign, deleteShipInTempCampaign } =
    tempCampaignContext;
  const [toggleShippingUpdateModal, setToggleShippingUpdateModal] =
    useState(false);

  const handleUpdateClick = (event) => {
    setToggleShippingUpdateModal(true);
  };

  const handleUpdateShippingSubmit = (data) => {
    // call action to update shipping in campaign
    updateShipInTempCampaign(props.userId, props.perkId, props.shipId, data);
    setToggleShippingUpdateModal(false);
  };

  const closeShippingUpdateModal = () => {
    setToggleShippingUpdateModal(false);
  };

  const handleDelete = (shipId) => (event) => {
    deleteShipInTempCampaign(props.userId, props.perkId, shipId);
  };

  return (
    <Item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      {props.location}
      <IconButton
        sx={{}}
        color="primary"
        aria-label="Add Shipping"
        component="span"
        onClick={handleUpdateClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={{}}
        color="primary"
        aria-label="Delete Shipping"
        component="span"
        onClick={handleDelete(props.shipId)}
      >
        <HighlightOffIcon fontSize="small" />
      </IconButton>

      <ShippingUpdatePerkModal
        toggleShippingUpdateModal={toggleShippingUpdateModal}
        closeShippingUpdateModal={closeShippingUpdateModal}
        handleUpdateShippingSubmit={handleUpdateShippingSubmit}
        location={props.location}
        fee={props.fee}
      />
    </Item>
  );
}
