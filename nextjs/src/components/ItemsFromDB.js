import { useState, useEffect, useContext } from "react";
import TempCampaignContext from "src/context/tempCampaign.context";
import { Item } from "src/utility/styledComp";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ItemUpdatePerkModal from "./ItemUpdatePerkModal";

export default function ItemsFromDB(props) {
  const tempCampaignContext = useContext(TempCampaignContext);
  const { updateItemInTempCampaign, deleteItemInTempCampaign } =
    tempCampaignContext;
  const [toggleItemUpdateModal, setToggleItemUpdateModal] = useState(false);

  const handleUpdateClick = (event) => {
    setToggleItemUpdateModal(true);
  };

  const handleUpdateItemSubmit = (data) => {
    // call action to update item in campaign
    updateItemInTempCampaign(props.userId, props.perkId, props.itemId, data);
    setToggleItemUpdateModal(false);
  };

  const closeItemUpdateModal = () => {
    setToggleItemUpdateModal(false);
  };

  const handleDelete = (itemId) => (event) => {
    deleteItemInTempCampaign(props.userId, props.perkId, itemId);
  };

  return (
    <Item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      {props.itemName}
      <IconButton
        sx={{}}
        color="primary"
        aria-label="Add Item"
        component="span"
        onClick={handleUpdateClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={{}}
        color="primary"
        aria-label="Delete Item"
        component="span"
        onClick={handleDelete(props.itemId)}
      >
        <HighlightOffIcon fontSize="small" />
      </IconButton>

      <ItemUpdatePerkModal
        toggleItemUpdateModal={toggleItemUpdateModal}
        closeItemUpdateModal={closeItemUpdateModal}
        handleUpdateItemSubmit={handleUpdateItemSubmit}
        itemName={props.itemName}
      />
    </Item>
  );
}
