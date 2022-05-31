import { styled } from "@mui/material/styles";

export const ButtonDiv = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "end",
  textAlign: "right",
  justifyContent: "end",
  width: "100%",
}));

export const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "100%",
}));

export const Iframe = styled("iframe")(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  height: 500,
  width: "100%",
}));

export const Input = styled("input")({
  display: "none",
});
