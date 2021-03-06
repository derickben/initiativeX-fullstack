import { useState, useEffect, useContext } from "react";
import { Item, StyledTableCell, StyledTableRow } from "src/utility/styledComp";
import TempCampaignContext from "src/context/tempCampaign.context";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ShippingPerkModal from "./ShippingPerkModal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PerkUpdateModal from "./PerkUpdateModal";
import ItemPerkModal from "./ItemPerkModal";
import ItemsFromDB from "./ItemsFromDB";
import ShippingsFromDB from "./ShippingsFromDB";

export default function PerkFromDB({ perk, perkId, userId }) {
  const tempCampaignContext = useContext(TempCampaignContext);
  const {
    getAllItemsFromAllPerks,
    getAllShippingsFromAllPerks,
    deletePerkInTempCampaign,
    updatePerkInTempCampaign,
    itemsFromContext,
    allItems,
    shippingsFromContext,
    allShippings,
    addItemToTempCampaign,
    addShipToTempCampaign,
  } = tempCampaignContext;

  const [items, setItems] = useState([]);
  const [shippings, setshippings] = useState([]);

  const [toggleItemModal, setToggleItemModal] = useState(false);

  const [togglePerkModal, setTogglePerkModal] = useState(false);

  const [toggleShippingModal, setToggleShippingModal] = useState(false);

  const handleAddShippingClick = (event) => {
    setToggleShippingModal(true);
  };

  const handleAddShippingSubmit = (data) => {
    // call action to add shipping to campaign
    addShipToTempCampaign(userId, perkId, data);
    setToggleShippingModal(false);
  };

  const closeShippingModal = () => {
    setToggleShippingModal(false);
  };

  const handleDelete = (perkId) => (event) => {
    deletePerkInTempCampaign(userId, perkId);
  };

  const handleAddItemClick = (event) => {
    setToggleItemModal(true);
  };

  const handleAddItemSubmit = (data) => {
    // call action to add item to campaign
    addItemToTempCampaign(userId, perkId, data);
    setToggleItemModal(false);
  };

  const closeItemModal = () => {
    setToggleItemModal(false);
  };

  const handleUpdateClick = (event) => {
    setTogglePerkModal(true);
  };

  const handleUpdateSubmit = (data) => {
    updatePerkInTempCampaign(userId, perkId, data);
    setTogglePerkModal(false);
  };

  const closePerkModal = () => {
    setTogglePerkModal(false);
  };

  const displayItemsFromDB = () => {
    const itemsForEachPerk = items.filter((item) => item.perkId === perkId);

    return (
      <div>
        {itemsForEachPerk?.[0]?.items.map((x) => (
          <ItemsFromDB
            itemName={x.itemName}
            userId={userId}
            perkId={perkId}
            itemId={x._id}
          />
        ))}
      </div>
    );
  };

  const displayShippingsFromDB = () => {
    const shippingsForEachPerk = shippings.filter(
      (ship) => ship.perkId === perkId
    );

    return (
      <div>
        {shippingsForEachPerk?.[0]?.shippings.map((x) => (
          <ShippingsFromDB
            fee={x.fee}
            location={x.location}
            userId={userId}
            perkId={perkId}
            shipId={x._id}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    getAllItemsFromAllPerks(userId);
    if (itemsFromContext.length > 0) {
      setItems(itemsFromContext);
    }
  }, [userId, perkId, allItems.length, itemsFromContext.length]);

  useEffect(() => {
    getAllShippingsFromAllPerks(userId);
    if (shippingsFromContext.length > 0) {
      setshippings(shippingsFromContext);
    }
  }, [userId, perkId, allShippings.length, shippingsFromContext.length]);

  return (
    <StyledTableRow sx={{ textAlign: "center" }}>
      <StyledTableCell component="th" scope="row">
        {perk?.title?.substr(0, 20)}
      </StyledTableCell>
      <StyledTableCell>{perk?.desc?.substr(0, 20) + " ..."}</StyledTableCell>
      <StyledTableCell>{perk.price}</StyledTableCell>
      <StyledTableCell>{perk.qtyAvailable}</StyledTableCell>
      <StyledTableCell>{perk.deliveryDate}</StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          sx={{}}
          color="primary"
          aria-label="Add Item"
          component="span"
          onClick={handleAddItemClick}
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>

        {items.length > 0 && displayItemsFromDB()}
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          sx={{}}
          color="primary"
          aria-label="Add Shipping"
          component="span"
          onClick={handleAddShippingClick}
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>

        {shippings.length > 0 && displayShippingsFromDB()}
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton
          sx={{}}
          color="primary"
          aria-label="Update Perk"
          component="span"
          onClick={handleUpdateClick}
        >
          <EditIcon />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton
          sx={{}}
          color="primary"
          aria-label="Delete Perk"
          component="span"
          onClick={handleDelete(perk._id)}
        >
          <HighlightOffIcon fontSize="large" />
        </IconButton>
      </StyledTableCell>

      <ItemPerkModal
        toggleItemModal={toggleItemModal}
        closeItemModal={closeItemModal}
        handleAddItemSubmit={handleAddItemSubmit}
      />

      <ShippingPerkModal
        toggleShippingModal={toggleShippingModal}
        closeShippingModal={closeShippingModal}
        handleAddShippingSubmit={handleAddShippingSubmit}
      />

      <PerkUpdateModal
        togglePerkModal={togglePerkModal}
        closePerkModal={closePerkModal}
        handleUpdateSubmit={handleUpdateSubmit}
        perk={perk}
      />
    </StyledTableRow>
  );
}
