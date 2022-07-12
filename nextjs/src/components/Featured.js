import { useState } from "react";
import useCategories from "src/hooks/useCategory.hook";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FeaturedCard } from "./FeaturedCard";

const Item = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  height: "30rem",
}));

export default function Featured() {
  const [value, setValue] = useState("education");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { categories, isCategoryLoading } = useCategories();

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        my: 15,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{ textAlign: "center", mb: "3rem" }}
      >
        InitiateX <span>featured ideas</span>
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="lab API tabs example"
          >
            {isCategoryLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              categories?.map(({ category, _id }) => (
                <Tab label={category} value={category} key={_id} />
              ))
            )}
          </TabList>
        </Box>

        {isCategoryLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          categories?.map(({ category, _id }) => (
            <TabPanel value={category} key={_id}>
              <Grid container spacing={4} sx={{ height: "100%" }}>
                <Grid item xs={12} md={4}>
                  <FeaturedCard />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FeaturedCard />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FeaturedCard />
                </Grid>
              </Grid>
            </TabPanel>
          ))
        )}
      </TabContext>
    </Box>
  );
}
