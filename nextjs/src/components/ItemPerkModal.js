import { useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ItemPerkModal(props) {
  const toggleItemModal = props.toggleItemModal;
  const closeItemModal = props.closeItemModal;
  const handleAddItemSubmit = props.handleAddItemSubmit;

  const [itemName, setItemName] = useState("");

  const handleChange = (event) => {
    setItemName(event.target.value);
  };

  const handleClose = () => {
    closeItemModal();
  };

  const handleSubmit = (event) => {
    handleAddItemSubmit(itemName);
  };

  return (
    <div>
      <Dialog open={toggleItemModal} onClose={handleClose} fullWidth>
        <DialogTitle>ITEM</DialogTitle>
        <DialogContent>
          <Typography paragraph sx={{ mb: 0 }}>
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
            value={itemName}
            onChange={handleChange}
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
