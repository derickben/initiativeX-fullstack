import Image from "next/image";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import image1 from "src/images/speaker_1.png";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
}));

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))",
  gap: "0px 5rem",
}));

const GridTextItem = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "min-content min-content 1fr",
  padding: "5rem 0",
}));

const ButtonItem = styled("div")(({ theme }) => ({
  alignSelf: "end",
}));

const headerImage = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

function Header() {
  return (
    <Box
      component="header"
      sx={{
        // width: "100wh",
        // height: "35rem",
        mt: 0,
        // backgroundColor: "primary.main",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          my: 0,
          py: 5,
          px: 0,
          height: "100%",
        }}
      >
        <GridContainer>
          <GridTextItem sx={{}}>
            <Typography component="h1" variant="h3">
              Breathe Life into ideas
            </Typography>
            <Typography component="h1" variant="h3">
              From anywhere
            </Typography>
            <ButtonItem>
              <Button variant="contained" sx={{ mr: "2rem" }}>
                BACK A PROJECT
              </Button>
              <Button variant="outlined">START A CAMPAIGN</Button>
            </ButtonItem>
          </GridTextItem>
          <Item
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              quality={100}
              loader={headerImage}
              src={image1}
              alt="Header Image"
            />
          </Item>
        </GridContainer>
      </Container>
    </Box>
  );
}

export default Header;
