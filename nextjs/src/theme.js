import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#9800c7",
      contrastText: "#5c0079",
    },
    secondary: {
      main: "#9800c7",
      contrastText: "#5c0079",
    },
  },
  typography: {
    fontSize: 14,
  },
});

export default theme;
