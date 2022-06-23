import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ShippingUpdatePerkModal(props) {
  const toggleShippingUpdateModal = props.toggleShippingUpdateModal;
  const closeShippingUpdateModal = props.closeShippingUpdateModal;
  const handleUpdateShippingSubmit = props.handleUpdateShippingSubmit;

  const [values, setValues] = useState({
    location: "",
    fee: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    closeShippingUpdateModal();
  };

  const handleSubmit = (event) => {
    handleUpdateShippingSubmit(values);
  };

  useEffect(() => {
    setValues({
      location: props.location,
      fee: props.fee,
    });
  }, []);

  return (
    <div>
      <Dialog open={toggleShippingUpdateModal} onClose={handleClose} fullWidth>
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
            id="question"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={values.location}
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
            value={values.fee}
            onChange={handleChange("fee")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
