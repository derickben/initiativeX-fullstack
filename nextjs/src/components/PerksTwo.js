import { useState, useEffect, useContext } from "react";
import LoginContext from "src/context/login.context";
import TempCampaignContext from "src/context/tempCampaign.context";
import Date from "./Date";
import { API_URL } from "src/config";
import ErrorSnackbar from "./ErrorSnackbar";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import LoadingModal from "./LoadingModal";
import { Item, ButtonDiv, Input } from "src/utility/styledComp";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VisibilityRadioGroup from "./VisibilityRadioGroup";
import ItemPerkModal from "./ItemPerkModal";
import ShippingRadioGroup from "./ShippingRadioGroup";
import ShippingPerkModal from "./ShippingPerkModal";

export default function PerksTwo() {
  const [visibility, setVisibility] = useState("visible");

  const [shipping, setShipping] = useState(false);

  const [duration, setDuration] = useState(null);

  const [toggleItemModal, setToggleItemModal] = useState(false);

  const [toggleShippingModal, setToggleShippingModal] = useState(false);

  const [values, setValues] = useState({
    price: "",
    title: "",
    desc: "",
    qtyAvailable: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAddItemClick = (event) => {
    setToggleItemModal(true);
  };

  const handleAddShippingClick = (event) => {
    setToggleShippingModal(true);
  };

  const handleAddItemSubmit = (value) => {
    // call action to add item to campaign
    setToggleItemModal(false);
  };

  const handleAddShippingSubmit = (value) => {
    // call action to add shipping to campaign
    setToggleShippingModal(false);
  };

  const closeItemModal = () => {
    setToggleItemModal(false);
  };

  const closeShippingModal = () => {
    setToggleShippingModal(false);
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
  };

  const handleVisibility = (event) => {
    setVisibility(event.target.value);
  };

  const handleShipping = (event) => {
    setShipping(!shipping);
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
        spacing={7}
      >
        <Item>
          <Typography variant="h4">Perk Details</Typography>
          <Typography paragraph={true}>
            Perks are incentives offered to backers in exchange for their
            support. Make sure your perks are not prohibited.
          </Typography>
        </Item>

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
            Included Items *
          </Typography>
          <Typography paragraph>
            Add the items included in this perk. Items could be physical,
            digital, experiences, or even just a thank you. Specify item
            quantity and add additional items to create bundles.
          </Typography>
          <IconButton
            sx={{ mt: 0 }}
            color="primary"
            aria-label="Add more faq"
            component="span"
            onClick={handleAddItemClick}
          >
            <Typography
              paragraph
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <ModeEditIcon sx={{ mr: 2 }} /> ADD ITEM
            </Typography>
          </IconButton>
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

        <Item>
          <Typography variant="h4" gutterBottom>
            Shipping
          </Typography>
          <Typography paragraph={true}>
            Does this perk contain items that you need to ship?
          </Typography>
          <ShippingRadioGroup
            shipping={shipping}
            handleShipping={handleShipping}
          />

          {shipping && (
            <IconButton
              sx={{ mt: 0 }}
              color="primary"
              aria-label="Add more faq"
              component="div"
              onClick={handleAddShippingClick}
            >
              <Typography
                paragraph
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <ModeEditIcon sx={{ mr: 2 }} /> ADD LOCATION
              </Typography>
            </IconButton>
          )}
        </Item>
      </Stack>

      <ItemPerkModal
        toggleItemModal={toggleItemModal}
        closeItemModal={closeItemModal}
        handleAddItemSubmit={handleAddItemSubmit}
      />

      <ShippingPerkModal
        toggleShippingModal={toggleShippingModal}
        closeShippingModal={closeShippingModal}
        handleAddShippingSubmit={handleAddShippingSubmit}
      />
    </Box>
  );
}
