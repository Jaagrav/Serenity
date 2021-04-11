import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  type: "dark",
  palette: {
    primary: {
      main: "#6DFFB9",
      dark: "#171E2C",
    },
    secondary: {
      main: "#3D485F",
    },
    text: {
      primary: "#6DFFB9",
      secondary: "#FFFFFF",
    },
    background: {
      default: "#171E2C",
      paper: "#171E2C",
      light: "#3D485F",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

export default theme;
