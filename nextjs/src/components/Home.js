import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Navbar from "./Navbar";
import Value from "./Value";
import Featured from "./Featured";
import Campaigns from "./Campaigns";
import Jumbo from "./Jumbo";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Paper>
        <Navbar />
        <CssBaseline />
        <Header />
        <Container maxWidth="lg" sx={{ my: 1, py: 2, px: 0 }}>
          <Value />
          <Featured />
          <Campaigns />
        </Container>
        <Jumbo />
        <Container maxWidth="xl" sx={{ mt: 5, p: 8 }}>
          <Footer />
        </Container>
      </Paper>
    </div>
  );
}
