import { styled } from "@mui/material/styles";
import PaidIcon from "@mui/icons-material/Paid";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "repeat(3,max-content)",
  justifyItems: "start",
  gap: "2rem 0",
  padding: "1rem",
}));

const Item = styled("div")(({ theme }) => ({
  height: "100%",
}));

export default function ValueCard({ iconName, title, text }) {
  const displayIcon = (iconName) => {
    switch (iconName) {
      case "paid":
        return <PaidIcon sx={{ fontSize: "3rem" }} />;

      case "support":
        return <SupportAgentIcon sx={{ fontSize: "3rem" }} />;

      case "safety":
        return <SafetyCheckIcon sx={{ fontSize: "3rem" }} />;

      default:
        break;
    }
  };

  return (
    <GridContainer>
      <Item> {displayIcon(iconName)} </Item>
      <Item>{title}</Item>
      <Item sx={{}}>{text}</Item>
    </GridContainer>
  );
}
