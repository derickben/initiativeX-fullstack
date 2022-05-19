import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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

export default function Featured() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        // height: "75vh",
        my: 10,

        backgroundColor: "violet",
      }}
    >
      Fundpress featured ideas
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="lab API tabs example"
          >
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
            <Tab label="Item Four" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
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
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </Box>
  );
}
