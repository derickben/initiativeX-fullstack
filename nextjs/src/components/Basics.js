import { useState, useContext, useEffect } from "react";
import { API_URL } from "src/config";
import Image from "next/image";
import TempCampaignContext from "src/context/tempCampaign.context";
import LoginContext from "src/context/login.context";
import useCategories from "../hooks/useCategory.hook";
import useTags from "../hooks/useTag.hook";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import CategorySelect from "./CategorySelect";
import TagSelect from "./TagSelect";
import Date from "./Date";
import LoadingModal from "./LoadingModal";
import ProgressBar from "./ProgressBar";
import ErrorSnackbar from "./ErrorSnackbar";
import { Item, ButtonDiv, Input } from "src/utility/styledComp";

const myLoader = ({ src, width, quality }) => {
  return `http://localhost:5000/${src}?w=${width}&q=${quality || 75}`;
};

export default function Basics() {
  const { user, getCurrentUser } = useContext(LoginContext);
  const tempCampaignContext = useContext(TempCampaignContext);
  const {
    getTempCampaign,
    addTempCampaign,
    tempCampaign,
    loading: isBasicLoading,
  } = tempCampaignContext;

  const [values, setValues] = useState({
    title: "",
    amountNeeded: 500000,
    desc: "",
    categoryValue: "",
  });

  const [duration, setDuration] = useState(null);
  const [tagName, settagName] = useState([]);
  const [photo, setPhoto] = useState({});
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadProgress, setUploadedProgress] = useState("");
  const [fileName, setFileName] = useState("UPLOAD IMAGE");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    settagName(typeof value === "string" ? value.split(",") : value);
  };

  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setUploadedProgress("done");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      duration,
      tags: tagName,
      title: values.title,
      amountNeeded: values.amountNeeded,
      desc: values.desc,
      category: values.categoryValue,
    };

    addTempCampaign(user.id, data, photo);
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    tempCampaignContext.closeSnackbar();
  };

  const { categories, isCategoryLoading } = useCategories();

  const { tags, isTagLoading } = useTags();

  useEffect(() => {
    getCurrentUser();
    getTempCampaign(user.id);
    if (tempCampaign._id) {
      setValues({
        title: tempCampaign.title,
        amountNeeded: tempCampaign.amountNeeded,
        desc: tempCampaign.desc,
        categoryValue: tempCampaign.category,
      });
      setFileName("File");
      setUploadedFile(tempCampaign.photo);
      setDuration(tempCampaign.duration);
      settagName(tempCampaign.tags);
    }
  }, [tempCampaign._id, user.id, tempCampaign.photo]);

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
          <Typography variant="h4" component="div" gutterBottom>
            Basics
          </Typography>
          <Typography paragraph={true}>
            Make a good first impression: introduce your campaign objectives and
            entice people to learn more. This basic information will represent
            your campaign on your campaign page, on your campaign card, and in
            searches.
          </Typography>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Campaign Title *
          </Typography>
          <Typography paragraph>What is the title of your campaign?</Typography>
          <FormControl fullWidth sx={{}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-title">
              My Campaign Title
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-title"
              value={values.title}
              onChange={handleChange("title")}
              aria-describedby="outlined-title-helper-text"
              label="My Campaign Title"
            />
          </FormControl>
        </Item>
        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Campaign Tagline *
          </Typography>
          <Typography paragraph>
            Provide a short description that best describes your campaign to
            your audience.
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            value={values.desc}
            onChange={handleChange("desc")}
            style={{ width: "100%" }}
          />
        </Item>
        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Campaign Goal Amount *
          </Typography>
          <Typography paragraph>
            How much money would you like to raise for this campaign? A minimum
            goal of 500,000 Naira is required
          </Typography>
          <FormControl fullWidth sx={{}} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-amountNeeded"
              value={values.amountNeeded}
              onChange={handleChange("amountNeeded")}
              aria-describedby="outlined-amountNeeded-helper-text"
            />
          </FormControl>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Campaign Card Image *
          </Typography>
          <Typography paragraph>
            Upload a square image that represents your campaign.
          </Typography>
          <Typography paragraph>
            640 x 640 recommended resolution, 220 x 220 minimum resolution.
          </Typography>

          <label htmlFor="icon-button-file">
            <Input
              accept="image/png, image/jpeg"
              id="icon-button-file"
              type="file"
              name="photo"
              onChange={handleImageChange}
            />

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  width: 200,
                  height: 200,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhotoCamera sx={{ mr: 2 }} color="primary" />
                <Typography variant="button" color="primary">
                  {fileName}
                  {uploadProgress ? <ProgressBar /> : null}
                </Typography>
              </Paper>
            </IconButton>
          </label>
        </Item>

        {uploadedFile ? (
          <Image
            loader={myLoader}
            src={uploadedFile}
            alt="Picture of the author"
            width={220}
            height={220}
          />
        ) : (
          ""
        )}

        {/* SELECT CATEGORY COMPONENT */}
        <CategorySelect
          categories={categories}
          value={values.categoryValue}
          handleChange={handleChange}
          loading={isCategoryLoading}
        />

        {/* SELECT TAG COMPONENT */}
        <TagSelect
          tags={tags}
          loading={isTagLoading}
          handleTagChange={handleTagChange}
          tagName={tagName}
        />

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Campaign Duration *
          </Typography>
          <Typography paragraph>
            How many days will you be running your campaign for? You can run a
            campaign for any number of days, with a 60 day duration maximum.
          </Typography>

          {/* DATE PICKER COMPONENT */}
          <Date value={duration} handleChange={handleDurationChange} />
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
