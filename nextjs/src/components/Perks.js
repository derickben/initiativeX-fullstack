import { useState, useEffect, useContext } from "react";
import LoginContext from "src/context/login.context";
import TempCampaignContext from "src/context/tempCampaign.context";
import Date from "./Date";
import { API_URL } from "src/config";
import ErrorSnackbar from "./ErrorSnackbar";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingModal from "./LoadingModal";
import {
  Item,
  ButtonDiv,
  Input,
  StyledTableCell,
} from "src/utility/styledComp";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VisibilityRadioGroup from "./VisibilityRadioGroup";
import PerkFromDB from "./PerkFromDB";

export default function Perks() {
  const { user, getCurrentUser } = useContext(LoginContext);
  const tempCampaignContext = useContext(TempCampaignContext);
  const {
    getTempCampaign,
    addPerkToTempCampaign,
    updatePerkInTempCampaign,
    tempCampaign,
    perksFromContext,
    loading: isBasicLoading,
  } = tempCampaignContext;

  const [perks, setPerks] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [visibility, setVisibility] = useState("visible");

  const [duration, setDuration] = useState(null);

  const [values, setValues] = useState({
    price: "",
    title: "",
    desc: "",
    qtyAvailable: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      deliveryDate: duration,
      price: values.price,
      title: values.title,
      desc: values.desc,
      qtyAvailable: values.qtyAvailable,
    };

    addPerkToTempCampaign(user.id, data);

    setValues({
      price: "",
      title: "",
      desc: "",
      qtyAvailable: "",
    });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    tempCampaignContext.closeSnackbar();
  };

  const displayPerksFromDB = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Delivery Date</StyledTableCell>
              <StyledTableCell align="center">Items</StyledTableCell>
              <StyledTableCell align="center">Shipping</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {perks.map((perk) => (
              <PerkFromDB
                perk={perk}
                userId={user.id}
                key={perk._id}
                perkId={perk._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleVisibility = (event) => {
    setVisibility(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setShowForm(!showForm);
  };

  useEffect(() => {
    getCurrentUser();
    getTempCampaign(user.id);
    if (tempCampaign._id && tempCampaign?.perks) {
      setPerks(perksFromContext);
    }
  }, [tempCampaign._id, user.id, perksFromContext.length]);

  const showPerkForm = () => {
    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={7}
      >
        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Visibility
          </Typography>
          <Typography paragraph>
            You can change the visibility of your perks at any time. Change the
            visibility to hidden if you’re working on a perk that is not ready
            or if you no longer want backers to claim it.
          </Typography>
          <VisibilityRadioGroup
            visibility={visibility}
            handleVisibility={handleVisibility}
          />
        </Item>
        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Price *
          </Typography>
          <Typography paragraph>
            Set an amount that you want to collect from backers who claim this
            perk. This amount should represent how much you want to receive for
            all the items included in this perk.
          </Typography>

          <FormControl sx={{ width: "30%" }}>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={values.price}
              onChange={handleChange("price")}
            />
          </FormControl>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Title *
          </Typography>
          <Typography paragraph>
            The title for your perk is what will appear on your campaign page
            and throughout Indiegogo. Create a title that best describes the
            contents of what this perk is offering.
          </Typography>
          <TextField
            fullWidth
            value={values.title}
            onChange={handleChange("title")}
            sx={{}}
            aria-describedby="outlined-question-helper-text"
            id="outlined-adornment-questiont"
          />
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Description *
          </Typography>
          <Typography paragraph>
            Describe the details of this perk. Be creative, this is your
            opportunity to educate backers on what they will be receiving after
            they claim this perk.
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            style={{ width: "100%" }}
            value={values.desc}
            onChange={handleChange("desc")}
          />
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Perk Image *
          </Typography>
          <Typography paragraph>
            Please do not use images containing text such as price and discount
            or the Indiegogo brand colors. Recommended dimensions: 660x440
            pixels. PNG or JPG supported.
          </Typography>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/png, image/jpeg"
              id="icon-button-file"
              type="file"
              name="photo"
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
                <Typography variant="button" color="primary"></Typography>
              </Paper>
            </IconButton>
          </label>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Quantity Available
          </Typography>
          <Typography paragraph>
            You can limit the quantity available to backers based on production
            volume. Leaving this field blank indicates that there is no quantity
            limit.
          </Typography>
          <TextField
            sx={{ width: "30%" }}
            aria-describedby="outlined-question-helper-text"
            id="outlined-adornment-questiont"
            value={values.qtyAvailable}
            onChange={handleChange("qtyAvailable")}
          />
        </Item>

        <Item>
          <Typography variant="h4" gutterBottom>
            Estimated delivery date
          </Typography>
          <Typography paragraph={true}>
            Estimate a delivery date for this perk for your backers. This date
            and future changes to it will appear on the perk card for your
            backers to see. We recommend that you post an update to backers
            whenever you change this date.
          </Typography>
        </Item>

        <Item>
          <Typography variant="h5" component="div" gutterBottom>
            Estimated date
          </Typography>
          {/* DATE PICKER COMPONENT */}
          <Date value={duration} handleChange={handleDurationChange} />
        </Item>
      </Stack>
    );
  };

  const displayForm = () => {
    if (perks.length == 0) {
      return showPerkForm();
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
      action={`${API_URL}/campaigns-temp/${user.id}/perk`}
      onSubmit={handleFormSubmit}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={7}
      >
        <Item>
          <Typography variant="h4">Perk Details</Typography>
          <Typography paragraph={true}>
            Perks are incentives offered to backers in exchange for their
            support. Make sure your perks are not prohibited.
          </Typography>
        </Item>

        {perks.length > 0 && displayPerksFromDB()}
        {perks.length > 0 && (
          <IconButton
            sx={{ mt: -4 }}
            color="primary"
            aria-label="Add more perk"
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
              <AddCircleIcon sx={{ mr: 2 }} /> ADD NEW PERK
            </Typography>
          </IconButton>
        )}

        {showForm && showPerkForm()}
        {displayForm()}

        {/* LOADING MODAL COMPONENT */}
        <LoadingModal loading={isBasicLoading} />

        <ButtonDiv variant="contained" type="submit">
          <Button variant="contained" type="submit">
            Add Perk
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
