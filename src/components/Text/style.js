export default function style(theme) {
  return {
    listItem: {
      padding: 0,
      color: theme.palette.text.secondary,
      marginBottom: 14,
    },
    theirText: {
      margin: "auto",
      marginLeft: 0,
      fontSize: 24,
      border: `2px solid ${theme.palette.secondary.main}`,
      borderLeft: 0,
      borderRadius: "0 24px 24px 0",
      padding: 12,
    },
    selfText: {
      margin: "auto",
      marginRight: 0,
      fontSize: 24,
      background: theme.palette.secondary.main,
      borderRadius: "24px 0 0 24px",
      padding: 12,
    },
  };
}
