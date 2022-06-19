import { useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ShippingPerkModal(props) {
  const toggleShippingModal = props.toggleShippingModal;
  const closeShippingModal = props.closeShippingModal;
  const handleAddShippingSubmit = props.handleAddShippingSubmit;

  const [value, setValue] = useState({
    location: "",
    fee: "",
  });

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleClose = () => {
    closeShippingModal();
  };

  const handleSubmit = (event) => {
    handleAddShippingSubmit(itemName);
  };

  return (
    <div>
      <Dialog open={toggleShippingModal} onClose={handleClose} fullWidth>
        <DialogTitle>SHIPPING</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Does this perk contain items that you need to ship?
          </DialogContentText>
          <Typography paragraph sx={{ mt: 2 }}>
            Location *
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="location"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
            value={value.location}
            onChange={handleChange("location")}
          />
        </DialogContent>
        <DialogContent>
          <Typography paragraph sx={{ mb: 0 }}>
            Fee *
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="fee"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3, width: "30%" }}
            value={value.fee}
            onChange={handleChange("fee")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
