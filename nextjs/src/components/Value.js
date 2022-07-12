import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ValueCard from "./ValueCard";

const GridTextItem = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "max-content max-content",
  gap: "3rem 0",
  padding: "1rem",
}));

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(20rem, 1fr))",
  padding: "1rem",
  gap: "2rem",
  height: "100%",
}));

export default function Value() {
  return (
    <Box component="section" sx={{ my: 10 }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={12} md={4}>
          <GridTextItem>
            <Typography component="h4" variant="h4">
              Change the world with your Ideas, they matter
            </Typography>
            <Typography>
              An idea, A Story, a product, you have the power to change the
              world .Initiative X Values the power of your mind and seeks to
              help bring these projects to life.
            </Typography>
          </GridTextItem>
        </Grid>
        <Grid item xs={12} md={8}>
          <GridContainer>
            <ValueCard
              iconName={"paid"}
              title={"Get Funded"}
              text={
                "The advertising business is not an equal one. Our goal is to change that by highlighting female creatives globally."
              }
            />
            <ValueCard
              iconName={"safety"}
              title={"Safety Guaranteed"}
              text={
                "The advertising business is not an equal one. Our goal is to change that by highlighting female creatives globally."
              }
            />
            <ValueCard
              iconName={"support"}
              title={"24/7 Online Support"}
              text={
                "The advertising business is not an equal one. Our goal is to change that by highlighting female creatives globally."
              }
            />
          </GridContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
