import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function VisibilityRadioGroup({ visibility, handleVisibility }) {
  const handleChange = (event) => {
    handleVisibility(event);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={visibility}
        onChange={handleChange}
      >
        <FormControlLabel
          value="visible"
          control={<Radio />}
          label={
            <>
              {<b>Visible. </b>}
              {`Perk is available to claim`}
            </>
          }
        />
        <FormControlLabel
          value="hidden"
          control={<Radio />}
          label={
            <>
              {<b>Hidden. </b>}
              {`Perk is not available to claim`}
            </>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
