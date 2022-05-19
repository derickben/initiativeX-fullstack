import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ProTip from "src/ProTip";
import Link from "src/Link";
import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function NewCampaign() {
  const [value, setValue] = useState("individual");
  const [country, setCountry] = useState("");

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const handleChangeOption = (event) => {
    setCountry(event.target.value);
  };
  return (
    <Box component="form" sx={{}}>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{ my: 5, py: 2, px: 0, backgroundColor: "green" }}
      >
        <Stack spacing={5}>
          <Item>
            <Typography component="h3" variant="h3" sx={{ mb: 4 }}>
              Let’s get ready to start your campaign!
            </Typography>
            <Typography component="p">
              We want to create the best onboarding for you – please fill out
              the information below.{" "}
              <b>
                Your answers will be locked for this campaign and can’t be
                changed later.
              </b>
            </Typography>
          </Item>
          <Item>
            <Box sx={{}}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography component="p">
                  <b>Who are you raising money for?</b>
                </Typography>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Please choose the type of account that will be receiving
                    your funds
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChangeRadio}
                  >
                    <FormControlLabel
                      value="individual"
                      control={<Radio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="business"
                      control={<Radio />}
                      label="Business or Non-profit"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Item>
          <Item>
            <Box sx={{}}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography component="p" align="left">
                  <b> Where are you located? </b>
                </Typography>
                <Typography component="p" align="left">
                  If you are raising funds as an individual, what is your
                  country of legal residence? If you are raising funds for a
                  business, where is the business headquartered?
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select a residence country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    label="Select a residence country"
                    onChange={handleChangeOption}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Item>
          <Item>
            <Button variant="contained" type="submit">
              START MY CAMPAIGN
            </Button>
          </Item>
        </Stack>
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
