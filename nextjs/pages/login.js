import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProTip from "src/ProTip";
import Link from "src/Link";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import FormLogin from "src/components/FormLogin";

export default function Login() {
  return (
    <Box sx={{}}>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{ my: 5, py: 2, px: 0, backgroundColor: "green" }}
      >
        <FormLogin />
      </Container>
      <Container
        maxWidth="xl"
        sx={{ my: 5, py: 2, px: 0, backgroundColor: "green" }}
      >
        <Footer />
      </Container>
    </Box>
  );
}
