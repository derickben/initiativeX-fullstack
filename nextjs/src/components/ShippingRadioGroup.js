import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ShippingRadioGroup({ shipping, handleShipping }) {
  const handleChange = (event) => {
    handleShipping(event);
  };
  return (
    <FormControl sx={{ display: "flex", alignItems: "flex-start" }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={shipping}
        onChange={handleChange}
      >
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="No. This perk does not contain items that need to be shipped"
        />
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="Yes. This perk contains items that need to be shipped"
        />
      </RadioGroup>
    </FormControl>
  );
}
