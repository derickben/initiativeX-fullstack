import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "10rem",

  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function Campaigns() {
  return (
    <Box
      component="section"
      sx={{ height: "80vh", my: 10, backgroundColor: "gold" }}
    >
      Popular campaigns
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={12} md={4}>
          <Item>First</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>Second</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>Third</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
