import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ItemUpdatePerkModal(props) {
  const toggleItemUpdateModal = props.toggleItemUpdateModal;
  const closeItemUpdateModal = props.closeItemUpdateModal;
  const handleUpdateItemSubmit = props.handleUpdateItemSubmit;

  const [value, setValue] = useState({
    itemName: "",
  });

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleClose = () => {
    closeItemUpdateModal();
  };

  const handleSubmit = (event) => {
    handleUpdateItemSubmit(value);
  };

  useEffect(() => {
    setValue({ itemName: props.itemName });
  }, []);

  return (
    <div>
      <Dialog open={toggleItemUpdateModal} onClose={handleClose} fullWidth>
        <DialogTitle>Included Items *</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the items included in this perk. Items could be physical,
            digital, experiences, or even just a thank you. Specify item
            quantity and add additional items to create bundles.
          </DialogContentText>
          <Typography paragraph sx={{ mt: 2 }}>
            Item Name *
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={value.itemName}
            onChange={handleChange("itemName")}
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
