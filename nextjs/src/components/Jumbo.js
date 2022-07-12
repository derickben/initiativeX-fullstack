import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import image1 from "src/images/back_other_bg.jpg";
import image2 from "src/images/get_funded_bg.jpg";
import { width } from "@mui/system";

const BackOthers = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundImage: `url(${image1.src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  padding: "10rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  height: "100%",

  "& button": {
    display: "none",
  },

  "&:hover": {
    "& button": {
      display: "block",
    },
  },
}));

const GetFunded = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundImage: `url(${image2.src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  padding: "10rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  height: "100%",

  "& button": {
    display: "none",
    transition: "all 1000.4s ease-in",
  },

  "&:hover": {
    "& button": {
      display: "block",
    },
  },
}));

const Overlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  transition: "all .4s ease",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

export default function Jumbo() {
  return (
    <Box
      component="section"
      sx={{ height: "30rem", my: 10, backgroundColor: "blue" }}
    >
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6}>
          <BackOthers>
            <Typography component="h3" variant="h3">
              Back Others
            </Typography>
            <Button variant="contained" sx={{}}>
              CREATE A PROJECT
            </Button>
            <Overlay />
          </BackOthers>
        </Grid>
        <Grid item xs={12} md={6}>
          <GetFunded>
            <Typography component="h3" variant="h3">
              Get Funded
            </Typography>
            <Button variant="contained" sx={{}}>
              CREATE A PROJECT
            </Button>
            <Overlay />
          </GetFunded>
        </Grid>
      </Grid>
    </Box>
  );
}
