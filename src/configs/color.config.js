import { createTheme } from "@mui/material/styles";

const themeConfigs = createTheme({
  palette: {
    primary: {
      main: "#ffc300",
      blue: "#2b1a58",
      contrastText: "rgb(102 105 102 / 90%)",
      highlightText: "#000",
      background: "#fff"
    },
    secondary: {
      main: '#428bca',
      contrastText: '#fff',
      background: "rgb(246,246,246)"
    },
  },

});

export default themeConfigs;
