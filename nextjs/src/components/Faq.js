import { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

export default function Faq() {
  const [addFaq, setAddFaq] = useState([]);

  const handleClick = (event) => {};
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
      <Typography paragraph>Question</Typography>
      <FormControl fullWidth sx={{ mb: 6 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-question">Question</InputLabel>
        <OutlinedInput
          id="outlined-adornment-question"
          aria-describedby="outlined-question-helper-text"
          label="Question"
        />
      </FormControl>

      <Typography paragraph>Answer</Typography>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        style={{ width: "100%", mt: 0 }}
      />

      <IconButton color="primary" aria-label="Add more faq" component="span">
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
