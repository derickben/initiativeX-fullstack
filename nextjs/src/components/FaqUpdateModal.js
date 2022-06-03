import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FaqUpdateModal(props) {
  const toggleFaqModal = props.toggleFaqModal;
  const closeFaqModal = props.closeFaqModal;
  const valuesToUpdate = props.valuesToUpdate;
  const handleUpdateSubmit = props.handleUpdateSubmit;

  const [values, setValues] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = () => {
    closeFaqModal();
  };

  const handleSubmit = (event) => {
    handleUpdateSubmit(values);
    // alert(values.answer);
  };

  useEffect(() => {
    setValues(valuesToUpdate);
  }, []);

  return (
    <div>
      <Dialog open={toggleFaqModal} onClose={handleClose} fullWidth>
        <DialogTitle>Update FAQ</DialogTitle>
        <DialogContent>
          <Typography paragraph sx={{ mb: 0 }}>
            Question
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={values.question}
            onChange={handleChange("question")}
          />
          <Typography paragraph sx={{ mb: 0 }}>
            Answer
          </Typography>
          <TextField
            margin="dense"
            fullWidth
            id="answer"
            type="text"
            variant="outlined"
            value={values.answer}
            onChange={handleChange("answer")}
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
