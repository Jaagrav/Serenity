export default function style(theme) {
  return {
    header: {
      padding: 14,
      background: "transparent",
      backdropFilter: "blur(20px)",
      boxShadow: "none",
      color: theme.palette.text.primary,
    },
    profilePhoto: {
      height: 30,
      width: 30,
      margin: "auto",
      marginBottom: 8,
    },
    displayName: {
      fontSize: 24,
      textAlign: "center",
    },
    messageList: {
      paddingBottom: 60,
    },
    footer: {
      height: 60,
      margin: "auto",
      top: "auto",
      bottom: 0,
      boxShadow: "none",
      background: theme.palette.background.default,
    },
    textMsg: {
      height: "100%",
      width: "100%",
      padding: 12,
      fontSize: 22,
      background: "transparent",
      outline: "none",
      border: "none",
      color: theme.palette.text.secondary,
    },
    sendMsg: {
      display: "flex",
    },
    sendMsgBtn: {
      margin: "auto",
    },
    divider: {
      // marginBottom: 12,
      background: theme.palette.background.light,
    },
  };
}
