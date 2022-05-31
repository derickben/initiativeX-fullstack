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

export default function Faq() {
  const [addFaq, setAddFaq] = useState([]);

  const [values, setValues] = useState({
    question: "",
    answer: "",
  });

  const [extraValues, setExtraValues] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleExtraValuesChange = (prop) => (event) => {
    setExtraValues({ ...values, [prop]: event.target.value });
  };
  const removeFaq = (idx) => (event) => {
    const newAddFaq = addFaq.map((faq) => {
      console.log(faq);
      // return faq.id !== idx;
    });
    setAddFaq(addFaq);
  };

  const QUESTION_AND_ANSWER = {
    faq: (
      <>
        <Typography paragraph>Question</Typography>
        <TextField
          fullWidth
          sx={{ mb: 4 }}
          aria-describedby="outlined-question-helper-text"
          id="outlined-adornment-questiont"
          value={values.question}
          onChange={handleChange("question")}
        />
        <Typography paragraph>Answer</Typography>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          style={{ width: "100%", mt: 0, marginBottom: "5rem" }}
          value={values.answer}
          onChange={handleChange("answer")}
        />
      </>
    ),
  };

  const matchID = () => {
    const idx = uuidv4();
    const QUESTION_AND_ANSWER_ON_CLICK = {
      faq: (
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
                onChange={handleExtraValuesChange("question")}
              />
            </Grid>
            <Grid item xs={0.5}>
              <IconButton
                id={idx}
                sx={{ mt: -4 }}
                color="primary"
                aria-label="Add more faq"
                component="span"
                onClick={removeFaq(idx)}
              >
                <HighlightOffIcon id={idx} />
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
                onChange={handleExtraValuesChange("answer")}
              />
            </Grid>
          </Grid>
        </div>
      ),
      id: idx,
    };

    return QUESTION_AND_ANSWER_ON_CLICK;
  };

  const displayFaqList = () => {
    console.log(addFaq);
    return addFaq.map((faq, id) => <div key={id}>{faq.faq}</div>);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAddFaq([...addFaq, matchID()]);
  };
  return (
    <Item>
      <Typography variant="h5" component="div" gutterBottom>
        FAQ *
      </Typography>
      <Typography paragraph gutterBottom sx={{ mb: 4 }}>
        The FAQ section should provide the most common details that backers are
        looking for when evaluating your campaign. We will also provide common
        answers to questions about crowdfunding and how Indiegogo works.
      </Typography>
      {QUESTION_AND_ANSWER.faq}

      {displayFaqList()}

      <IconButton
        sx={{ mt: -4 }}
        color="primary"
        aria-label="Add more faq"
        component="span"
        onClick={handleClick}
      >
        <Typography
          paragraph
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <AddCircleIcon sx={{ mr: 4 }} /> ADD ANOTHER QUESTION
        </Typography>
      </IconButton>
    </Item>
  );
}
