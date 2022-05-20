import { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

export default function CategorySelect({
  categories,
  value,
  handleChange,
  loading,
}) {
  console.log("categoryValue", value);
  const categoryBody = useMemo(() => {
    return categories?.map(({ category }) => (
      <MenuItem value={category} key={category}>
        {category}
      </MenuItem>
    ));
  }, [categories]);

  return (
    <Item>
      <Typography variant="h5" component="div" gutterBottom>
        Category *
      </Typography>
      <Typography paragraph>
        To help backers find your campaign, select a category that best
        represents your project.
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category "
          value={value}
          onChange={handleChange("categoryValue")}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            categoryBody
          )}
        </Select>
      </FormControl>
    </Item>
  );
}
