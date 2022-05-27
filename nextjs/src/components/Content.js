import { useState, useCallback } from "react";
import TextEditor from "./TextEditor";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Faq from "./Faq";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

const Iframe = styled("iframe")(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  height: 500,
  width: "100%",
}));

let youtubeLink = "";

export default function Content() {
  const [values, setValues] = useState({
    videoUrl: "",
  });

  const [urlError, setUrlError] = useState(null);

  const [faq, setFaq] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAddVideoButtonClick = (event) => {
    event.preventDefault();
    const checker = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

    const isYoutubeUrl = checker.test(values.videoUrl);

    if (isYoutubeUrl) {
      setUrlError(null);
      values["videoUrl"].includes("watch?v=")
        ? setValues({
            ...values,
            videoUrl: values["videoUrl"].replace("watch?v=", "embed/"),
          })
        : "";
      youtubeLink = values["videoUrl"].replace("watch?v=", "embed/");
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
                value={values.videoUrl}
                onChange={handleChange("videoUrl")}
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

        <Faq />
      </Stack>
    </Box>
  );
}
