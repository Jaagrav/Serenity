export default function style(theme) {
  return {
    header: {
      background: theme.palette.background.default,
      boxShadow: "none",
      paddingTop: 16,
      paddingBottom: 16,
    },
    brandingName: {
      color: theme.palette.text.primary,
      fontSize: 28,
      margin: "0 0",
    },
    userProfilePic: {
      margin: "auto 0 auto auto",
    },
    bottomAppBar: {
      position: "absolute",
      margin: "auto",
      top: "auto",
      bottom: 0,
      height: 60,
      boxShadow: "none",
      background: theme.palette.background.default,
      padding: "0 22px",
    },
    patientMode: {
      display: "flex",
      color: theme.palette.text.primary,
      margin: "auto",
      fontSize: 24,
    },
    patientModeSwitch: {
      margin: "auto 0 auto auto",
    },
    divider: {
      marginBottom: 12,
      background: theme.palette.background.light,
    },
  };
}
