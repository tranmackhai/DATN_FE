import Router from "./routes/routes";
import themeConfigs from "./configs/color.config";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import accountApi from "./api/modules/account.api";
import { setAccount } from "./redux/features/accountSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken = localStorage.getItem("actkn");
    if (accessToken) {
      try {
        (async () => {
          const res = await accountApi.getProfile();
          // console.log(res);
          if (res.response.status === 200) {
            dispatch(setAccount({ user: res.response.data }));
          }
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={themeConfigs}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
