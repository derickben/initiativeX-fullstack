import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

export default function Date({ value, handleChange }) {
  const handleDateChange = () => {
    handleChange("duration");
  };
  return (
    <Item>
      <Typography variant="h5" component="div" gutterBottom>
        Campaign Duration *
      </Typography>
      <Typography paragraph>
        How many days will you be running your campaign for? You can run a
        campaign for any number of days, with a 60 day duration maximum.
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Days"
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Item>
  );
}
