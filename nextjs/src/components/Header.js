import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),

  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        height: "75vh",
        mt: 10,
        backgroundColor: "blue",
        "&:hover": {
          backgroundColor: "red",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6}>
          <Item>Text</Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>Image</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
