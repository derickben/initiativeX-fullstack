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

export default function FaqUpdateCard({ userId, faqId, question, answer }) {
  const tempCampaignContext = useContext(TempCampaignContext);
  const { deleteFaqInTempCampaign, updateFaqInTempCampaign } =
    tempCampaignContext;

  const [toggleFaqModal, setToggleFaqModal] = useState(false);

  const valuesToUpdate = { question, answer };

  const handleDelete = (faqId) => (event) => {
    deleteFaqInTempCampaign(userId, faqId);
  };

  const handleUpdateClick = (event) => {
    setToggleFaqModal(true);
  };

  const handleUpdateSubmit = (data) => {
    updateFaqInTempCampaign(userId, faqId, data);
    setToggleFaqModal(false);
  };

  const closeFaqModal = () => {
    setToggleFaqModal(false);
  };

  useEffect(() => {}, []);

  return (
    <Item key={faqId}>
      <Typography paragraph>Question</Typography>
      <Grid container spacing={2} sx={{}}>
        <Grid item xs={11}>
          <TextField
            disabled
            fullWidth
            sx={{ mb: 4 }}
            aria-describedby="outlined-question-helper-text"
            id="outlined-adornment-questiont"
            value={question}
          />
        </Grid>

        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{ mt: -4 }}
            color="primary"
            aria-label="Add more faq"
            component="span"
            onClick={handleDelete(faqId)}
          >
            <HighlightOffIcon />
          </IconButton>
          <IconButton
            sx={{}}
            color="primary"
            aria-label="Add more faq"
            component="span"
            onClick={handleUpdateClick}
          >
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Typography paragraph>Answer</Typography>
      <Grid container spacing={2} sx={{}}>
        <Grid item xs={11}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            disabled
            style={{ width: "100%", mt: 0, marginBottom: "2rem" }}
            value={answer}
          />
        </Grid>
      </Grid>

      <FaqUpdateModal
        toggleFaqModal={toggleFaqModal}
        closeFaqModal={closeFaqModal}
        valuesToUpdate={valuesToUpdate}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </Item>
  );
}
