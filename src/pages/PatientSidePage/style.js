export default function style(theme) {
  return {
    patientSidePage: {
      height: "100%",
      width: "100%",
    },
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
    text: {
      fontSize: 36,
      color: theme.palette.text.secondary,
    },
    morse: {
      fontSize: 36,
      color: theme.palette.text.secondary,

    }
  };
}
