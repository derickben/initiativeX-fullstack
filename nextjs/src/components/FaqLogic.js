import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

export default function FaqLogic({}) {
  const [extraValues, setExtraValues] = useState({
    question: "",
    answer: "",
  });

  const matchID = () => {
    const idx = uuidv4();
    const QUESTION_AND_ANSWER_ON_CLICK = {
      question: (
        <div>
          <Typography paragraph>Question</Typography>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={11.5}>
              <TextField
                fullWidth
                sx={{ mb: 4 }}
                aria-describedby="outlined-question-helper-text"
                id="outlined-adornment-questiont"
                value={extraValues.question}
              />
            </Grid>
            <Grid item xs={0.5}>
              <IconButton
                id={idx}
                sx={{ mt: -4 }}
                color="primary"
                aria-label="Add more faq"
                component="span"
              >
                <HighlightOffIcon id={idx} />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ),
      answer: (
        <div>
          <Typography paragraph>Answer</Typography>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={11.5}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                style={{ width: "100%", mt: 0, marginBottom: "5rem" }}
                value={extraValues.answer}
              />
            </Grid>
          </Grid>
        </div>
      ),
      id: idx,
    };

    return QUESTION_AND_ANSWER_ON_CLICK;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Item>
      <Typography paragraph>Question</Typography>
      <Grid container spacing={2} sx={{}}>
        <Grid item xs={11.5}>
          <TextField
            fullWidth
            sx={{ mb: 4 }}
            aria-describedby="outlined-question-helper-text"
            id="outlined-adornment-questiont"
            value={extraValues.question}
          />
        </Grid>
        <Grid item xs={0.5}>
          <IconButton
            sx={{ mt: -4 }}
            color="primary"
            aria-label="Add more faq"
            component="span"
          >
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Typography paragraph>Answer</Typography>
      <Grid container spacing={2} sx={{}}>
        <Grid item xs={11.5}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            style={{ width: "100%", mt: 0, marginBottom: "5rem" }}
            value={extraValues.answer}
          />
        </Grid>
      </Grid>
    </Item>
  );
}
