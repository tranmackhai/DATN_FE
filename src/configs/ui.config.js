import { createTheme } from '@mui/material/styles';

const uiConfig = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthSm: {
          maxWidth: 200,
        },
        maxWidthMd: {
          maxWidth: 320,
        },
        maxWidthLg: {
          maxWidth: 1280,
          padding: 0,
        },
      },
    },
  },
});

export default uiConfig;