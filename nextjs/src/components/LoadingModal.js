import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoadingModal({ loading }) {
  let isLoading = loading.getCampaign || loading.saveBasics;
  const [open, setOpen] = useState(isLoading);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleOpen = () => setOpen(isLoading);
    handleOpen();
  }, [isLoading]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
