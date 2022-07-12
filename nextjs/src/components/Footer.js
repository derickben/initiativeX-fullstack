import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowRightAltSharpIcon from "@mui/icons-material/ArrowRightAltSharp";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Discover = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "1fr 2fr 1fr",
  justifyItems: "center",
  alignItems: "center",
  gap: "2rem 0",
  padding: "2rem",
  border: "solid 1px #ddd",
  height: "100%",
}));

const Company = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "2fr repeat(4, 1fr)",
  justifyItems: "start",
  alignItems: "center",
  gap: "2rem 0",
  padding: "1rem",
  height: "100%",
}));

const Item = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",

  "& p": {
    marginLeft: "0.5rem",
  },
}));

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "20rem",
        mt: 5,
        px: 5,
      }}
    >
      <Grid container columnSpacing={4} sx={{ height: "100%" }}>
        <Grid item xs={12} md={6} lg={3}>
          <Discover>
            <Typography>LOGO</Typography>
            <Typography sx={{ textAlign: "center" }}>
              Each and every Fundpress project is the independent creation of
              someone like you.Want to know more.
            </Typography>
            <Button variant="outlined">See Campaign</Button>
          </Discover>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Company>
            <Typography component="h6" variant="h5">
              Company
            </Typography>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>About Us</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Our Rules</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Career</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Contact</Typography>
            </Item>
          </Company>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Company>
            <Typography component="h6" variant="h5">
              Help
            </Typography>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Our Rules</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Privacy Policy</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Terms Of Use</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Trust And Safety</Typography>
            </Item>
          </Company>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Company>
            <Typography component="h6" variant="h5">
              Company
            </Typography>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>About Us</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Our Rules</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Career</Typography>
            </Item>
            <Item>
              <ArrowRightAltSharpIcon />
              <Typography>Contact</Typography>
            </Item>
          </Company>
        </Grid>
      </Grid>
    </Box>
  );
}
