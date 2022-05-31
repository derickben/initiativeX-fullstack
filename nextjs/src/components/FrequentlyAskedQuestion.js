import { useState, useEffect, useCallback } from "react";
import { Item, ButtonDiv } from "src/utility/styledComp";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Box, Stack, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FaqLogic from "./FaqLogic";

export default function FrequentlyAskedQuestion() {
  const [values, setValues] = useState({
    question: "",
    answer: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setList([...list, matchID()]);
  };

  const showFaqForm = () => {
    return (
      <Item>
        <Typography variant="h5" component="div" gutterBottom>
          FAQ *
        </Typography>
        <Typography paragraph gutterBottom sx={{ mb: 4 }}>
          The FAQ section should provide the most common details that backers
          are looking for when evaluating your campaign. We will also provide
          common answers to questions about crowdfunding and how Indiegogo
          works.
        </Typography>
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
      </Item>
    );
  };

  return (
    <Box
      component="form"
      sx={{
        width: "80%",
      }}
      method="post"
      autoComplete="off"
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        {showForm && showFaqForm()}

        <ButtonDiv variant="contained" type="submit">
          <Button variant="contained" type="submit">
            Save & Continue
          </Button>
        </ButtonDiv>
      </Stack>
    </Box>
  );
}
