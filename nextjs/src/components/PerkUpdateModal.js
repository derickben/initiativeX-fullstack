import { useState, useEffect } from "react";
import Date from "./Date";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Item, ButtonDiv, Input } from "src/utility/styledComp";
import VisibilityRadioGroup from "./VisibilityRadioGroup";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function PerkUpdateModal(props) {
  const togglePerkModal = props.togglePerkModal;
  const closePerkModal = props.closePerkModal;
  const handleUpdateSubmit = props.handleUpdateSubmit;

  const [visibility, setVisibility] = useState("visible");

  const [duration, setDuration] = useState(null);

  const [values, setValues] = useState({
    price: "",
    title: "",
    desc: "",
    qtyAvailable: "",
  });

  const handleVisibility = (event) => {
    setVisibility(event.target.value);
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    closePerkModal();
  };

  const handleSubmit = (event) => {
    handleUpdateSubmit(values);
  };

  useEffect(() => {
    setValues(props.perk);
    setDuration(props.perk.deliveryDate);
  }, []);

  return (
    <div>
      <Dialog open={togglePerkModal} onClose={handleClose} fullWidth>
        <DialogTitle>Update PERK</DialogTitle>
        <DialogContent>
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
                You can change the visibility of your perks at any time. Change
                the visibility to hidden if you’re working on a perk that is not
                ready or if you no longer want backers to claim it.
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
                Set an amount that you want to collect from backers who claim
                this perk. This amount should represent how much you want to
                receive for all the items included in this perk.
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
                The title for your perk is what will appear on your campaign
                page and throughout Indiegogo. Create a title that best
                describes the contents of what this perk is offering.
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
                opportunity to educate backers on what they will be receiving
                after they claim this perk.
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
                Please do not use images containing text such as price and
                discount or the Indiegogo brand colors. Recommended dimensions:
                660x440 pixels. PNG or JPG supported.
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
                You can limit the quantity available to backers based on
                production volume. Leaving this field blank indicates that there
                is no quantity limit.
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
                Estimate a delivery date for this perk for your backers. This
                date and future changes to it will appear on the perk card for
                your backers to see. We recommend that you post an update to
                backers whenever you change this date.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
