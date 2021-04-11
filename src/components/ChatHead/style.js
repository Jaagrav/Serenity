export default function style(theme) {
  return {
    avatar: {
      height: 45,
      width: 45,
    },
    displayName: {
      fontSize: "24px !important",
      "& span": {
        fontFamily: "Poppins, sans-serif !important",
      },
    },
    divider: {
      marginTop: 14,
      background: theme.palette.background.light,
    },
  };
}
