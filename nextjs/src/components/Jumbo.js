import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#309ad0",
  ...theme.typography.body2,
  padding: "10rem",

  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function Jumbo() {
  return (
    <Box
      component="section"
      sx={{ height: "70vh", my: 10, backgroundColor: "blue" }}
    >
      <Grid container spacing={0} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6}>
          <Item>Text</Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>Values</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
