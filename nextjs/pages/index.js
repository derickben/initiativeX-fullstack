import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProTip from "src/ProTip";
import Link from "src/Link";
import Copyright from "src/Copyright";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import Home from "src/components/Home";

export default function Index() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Home />
    </Box>
  );
}
