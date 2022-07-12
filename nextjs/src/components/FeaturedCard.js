import { styled } from "@mui/material/styles";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import TimerIcon from "@mui/icons-material/Timer";
// import image1 from "src/images/speaker_1.png";
import image1 from "src/images/indi.png";

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  height: "30rem",
  border: "1px solid #ddd",
}));

const TextContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "1fr 1fr 0.5fr",
  padding: "1rem",
  gap: "1rem 0",
  height: "100%",
}));

const CardBottom = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const CardDuration = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const cardImage = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const FeaturedCard = () => {
  return (
    <GridContainer>
      <Image quality={100} loader={cardImage} src={image1} alt="Header Image" />

      <TextContainer>
        <Typography component="h5" variant="h5">
          Rolling framing toy Rolling framing toy
        </Typography>
        <Typography>
          What adventures do you get yourself into everyday, but people with
          disability gets into some pretty seriously.
        </Typography>
        <CardBottom>
          <CardDuration>
            <TimerIcon sx={{ mr: "1rem" }} />
            <Typography>57 days left</Typography>
          </CardDuration>

          <CardDuration>
            <span>N</span>
            <Typography>6000</Typography>
          </CardDuration>
        </CardBottom>
      </TextContainer>
    </GridContainer>
  );
};
