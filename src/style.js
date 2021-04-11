export default function style(theme) {
  return {
    "@global": {
      "*": {
        margin: 0,
        fontFamily: "Poppins, sans-serif !important",
        textDecoration: "none",
        boxSizing: "border-box",
        userSelect: "none"
      },
    },
    container: {
      position: "fixed",
      height: "100%",
      width: "100%",
      margin: "auto",
      top: "0",
      left: "0",
      right: "0",
      overflow: "auto",
    },
  };
}
