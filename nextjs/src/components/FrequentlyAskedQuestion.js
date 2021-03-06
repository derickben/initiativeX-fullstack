import { useState, useEffect, useContext } from "react";
import LoginContext from "src/context/login.context";
import TempCampaignContext from "src/context/tempCampaign.context";
import { API_URL } from "src/config";
import ErrorSnackbar from "./ErrorSnackbar";
import LoadingModal from "./LoadingModal";
import { Item, ButtonDiv } from "src/utility/styledComp";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FaqUpdateCard from "./FaqUpdateCard";

export default function FrequentlyAskedQuestion() {
  const { user, getCurrentUser } = useContext(LoginContext);
  const tempCampaignContext = useContext(TempCampaignContext);
  const {
    getTempCampaign,
    addFaqToTempCampaign,
    tempCampaign,
    faqsFromContext,
    loading: isBasicLoading,
  } = tempCampaignContext;

  const [values, setValues] = useState({
    question: "",
    answer: "",
  });

  const [faqs, setFaqs] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = { question: values.question, answer: values.answer };

    addFaqToTempCampaign(user.id, data);

    setValues({ question: "", answer: "" });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    tempCampaignContext.closeSnackbar();
  };

  const displayFaqFromDB = () => {
    return faqs.map(({ _id, question, answer }) => {
      return (
        <FaqUpdateCard
          userId={user.id}
          faqId={_id}
          question={question}
          answer={answer}
        />
      );
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  };

  useEffect(() => {
    getCurrentUser();
    getTempCampaign(user.id);
    if (tempCampaign._id && tempCampaign?.faqs) {
      setFaqs(faqsFromContext);
    }
  }, [tempCampaign._id, user.id, faqsFromContext.length]);

  const showFaqForm = () => {
    return (
      <Item>
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

  const displayForm = () => {
    if (faqs.length == 0) {
      return showFaqForm();
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: "80%",
      }}
      method="post"
      autoComplete="off"
      action={`${API_URL}/campaigns-temp/${user.id}/faq`}
      onSubmit={handleFormSubmit}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            FAQ *
          </Typography>
          <Typography paragraph gutterBottom sx={{ mb: 2 }}>
            The FAQ section should provide the most common details that backers
            are looking for when evaluating your campaign. We will also provide
            common answers to questions about crowdfunding and how Indiegogo
            works.
          </Typography>
        </Item>

        {faqs.length > 0 && displayFaqFromDB()}
        {faqs.length > 0 && (
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
              <AddCircleIcon sx={{ mr: 2 }} /> ADD ANOTHER QUESTION
            </Typography>
          </IconButton>
        )}

        {showForm && showFaqForm()}
        {displayForm()}

        {/* LOADING MODAL COMPONENT */}
        <LoadingModal loading={isBasicLoading} />

        <ButtonDiv variant="contained" type="submit">
          <Button variant="contained" type="submit">
            Add
          </Button>
        </ButtonDiv>
      </Stack>
      <ErrorSnackbar
        toggleSnackbar={tempCampaignContext.snackbarOpen}
        closeSnackbar={closeSnackbar}
        errorMessage={tempCampaignContext.error}
        successMessage={tempCampaignContext.success}
      />
    </Box>
  );
}
