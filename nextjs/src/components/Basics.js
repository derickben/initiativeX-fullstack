import { useState, useContext, useEffect } from "react";
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
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CategorySelect from "./CategorySelect";
import TagSelect from "./TagSelect";
import Date from "./Date";
import { API_URL } from "src/config";
import LoadingModal from "./LoadingModal";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

const ButtonDiv = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "end",
  textAlign: "right",
  justifyContent: "end",
  width: "100%",
}));

const Input = styled("input")({
  display: "none",
});

export default function Basics() {
  const { user, getCurrentUser } = useContext(LoginContext);
  const {
    getTempCampaign,
    addTempCampaign,
    tempCampaign,
    loading: isBasicLoading,
  } = useContext(TempCampaignContext);

  const [values, setValues] = useState({
    title: "",
    desc: "",
    categoryValue: "",
  });

  const [duration, setDuration] = useState(null);
  const [tagName, settagName] = useState([]);
  const [photo, setPhoto] = useState({});

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
  };

  const handleFormSubmit = (event) => {
    e.preventDefault();
    const data = {
      photo,
      duration,
      tagName,
      title: values.title,
      desc: values.desc,
      categoryValue: values.categoryValue,
    };

    addTempCampaign(data);
  };

  const { categories, isCategoryLoading } = useCategories();

  const { tags, isTagLoading } = useTags();

  useEffect(() => {
    getCurrentUser();
    getTempCampaign(user.id);
    if (tempCampaign._id) {
      setValues({
        title: tempCampaign.title,
        desc: tempCampaign.desc,
        categoryValue: tempCampaign.category,
      });
      setDuration(tempCampaign.duration);
      settagName(tempCampaign.tags);
    }
    console.log("tempCampaign", tempCampaign);
  }, [tempCampaign._id, user.id]);

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
                  width: 400,
                  height: 400,
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhotoCamera sx={{ mr: 2 }} color="primary" />
                <Typography variant="button" color="primary">
                  UPLOAD IMAGE
                </Typography>
              </Paper>
            </IconButton>
          </label>
        </Item>

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

        {/* DATE PICKER COMPONENT */}
        <Date value={duration} handleChange={handleDurationChange} />

        {/* LOADING MODAL COMPONENT */}
        <LoadingModal loading={isBasicLoading.getCampaign} />

        <ButtonDiv variant="contained" type="submit">
          <Button variant="contained" type="submit">
            Save & Continue
          </Button>
        </ButtonDiv>
      </Stack>
    </Box>
  );
}
