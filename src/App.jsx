import themeConfigs from "./configs/color.config";
import Router from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <ThemeProvider theme={themeConfigs}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
