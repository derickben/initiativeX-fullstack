import { useState, useCallback, useContext, useEffect } from "react";
import { API_URL } from "src/config";
import TempCampaignContext from "src/context/tempCampaign.context";
import LoginContext from "src/context/login.context";
import ErrorSnackbar from "./ErrorSnackbar";
import LoadingModal from "./LoadingModal";
import { Item, ButtonDiv, Iframe } from "src/utility/styledComp";
import TextEditor from "./TextEditor";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Faq from "./Faq";
import FrequentlyAskedQuestion from "./FrequentlyAskedQuestion";

let youtubeLink = "";

export default function Content() {
  const { user, getCurrentUser } = useContext(LoginContext);
  const tempCampaignContext = useContext(TempCampaignContext);
  const {
    getTempCampaign,
    addTempCampaign,
    tempCampaign,
    loading: isBasicLoading,
  } = tempCampaignContext;

  const [values, setValues] = useState({
    videoLink: "",
  });

  const [urlError, setUrlError] = useState(null);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      videoLink: values.videoLink,
    };

    addTempCampaign(user.id, data);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    tempCampaignContext.closeSnackbar();
  };

  const handleAddVideoButtonClick = (event) => {
    event.preventDefault();
    const checker = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

    const isYoutubeUrl = checker.test(values.videoLink);

    if (isYoutubeUrl) {
      setUrlError(null);
      values["videoLink"].includes("watch?v=")
        ? setValues({
            ...values,
            videoLink: values["videoLink"].replace("watch?v=", "embed/"),
          })
        : "";
      youtubeLink = values["videoLink"].replace("watch?v=", "embed/");
      console.log("youtubeLink", youtubeLink);
    } else {
      setUrlError({ error: "yes" });
    }
  };

  const checkForUrlError = () => {
    if (urlError == null)
      return (
        <Typography
          variant="subtitle1"
          color="error"
          gutterBottom
          sx={{ mb: 2 }}
        ></Typography>
      );

    return (
      <Typography variant="subtitle1" color="error" gutterBottom sx={{ mb: 2 }}>
        Please enter a valid YouTube
      </Typography>
    );
  };

  const displayIframe = useCallback((youtubeLink) => {
    return <Iframe src={youtubeLink} />;
  });

  useCallback(() => {}, [youtubeLink]);

  useEffect(() => {
    getCurrentUser();
    getTempCampaign(user.id);
    if (tempCampaign._id) {
      setValues({
        videoLink: tempCampaign.videoLink,
      });
    }
    console.log("tempCampaign", tempCampaign);
  }, [tempCampaign._id, user.id, tempCampaign.videoLink]);

  return (
    <Box
      component="form"
      sx={{
        width: "80%",
      }}
      method="post"
      autoComplete="off"
      action={`${API_URL}/campaigns-temp`}
      onSubmit={handleFormSubmit}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Item>
          <Typography variant="h4" gutterBottom>
            Pitch Video
          </Typography>
          <Typography paragraph={true}>
            Add a video or image to appear on the top of your campaign page.
            Campaigns with videos raise 2000% more than campaigns without
            videos. Keep your video 2-3 minutes.
          </Typography>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Video URL *
          </Typography>
          <Typography paragraph>
            Enter a YouTube URL to appear at the top of your campaign page. Make
            sure your video has closed captioning enabled on Youtube
          </Typography>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                sx={{}}
                // error={false}
                id="outlined-error-helper-text"
                placeholder="https://"
                value={values.videoLink}
                onChange={handleChange("videoLink")}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="contained"
                type="button"
                onClick={handleAddVideoButtonClick}
                sx={{ height: "100%", width: "100%" }}
              >
                Add video
              </Button>
            </Grid>
          </Grid>
          {checkForUrlError()}
          {displayIframe(youtubeLink)}
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Story *
          </Typography>
          <Typography paragraph>
            Tell potential contributors more about your campaign. Provide
            details that will motivate people to contribute. A good pitch is
            compelling, informative, and easy to digest.
          </Typography>
          <TextEditor />
        </Item>

        {/* LOADING MODAL COMPONENT */}
        <LoadingModal loading={isBasicLoading} />

        <ButtonDiv variant="contained" type="submit">
          <Button variant="contained" type="submit">
            Save & Continue
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
