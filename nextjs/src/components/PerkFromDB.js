import { useState, useEffect, useContext } from "react";
import { Item } from "src/utility/styledComp";
import TempCampaignContext from "src/context/tempCampaign.context";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FaqUpdateModal from "./FaqUpdateModal";

export default function PerkFromDB(props) {
  const tempCampaignContext = useContext(TempCampaignContext);
  const { deletePerkInTempCampaign, updatePerkInTempCampaign } =
    tempCampaignContext;

  const [togglePerkModal, setTogglePerkModal] = useState(false);

  const { userId, perkId, title } = props;

  const handleDelete = (perkId) => (event) => {
    deleteFaqInTempCampaign(userId, perkId);
  };

  const handleUpdateClick = (event) => {
    setToggleFaqModal(true);
  };

  const handleUpdateSubmit = (data) => {
    updateFaqInTempCampaign(userId, perkId, data);
    setToggleFaqModal(false);
  };

  const closeFaqModal = () => {
    setToggleFaqModal(false);
  };

  return (
    <Item key={perkId}>
      <Typography paragraph>Title</Typography>
      <TextField
        disabled
        fullWidth
        sx={{ mb: 4 }}
        aria-describedby="outlined-question-helper-text"
        id="outlined-adornment-questiont"
        value={title}
      />
    </Item>
  );
}
