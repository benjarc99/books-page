import React from "react";

const Message = ({ msg, bgColor, marginTop }) => {
  let styles = {
    padding: "1rem",
    marginTop: marginTop,
    marginBottom: "1rem",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: bgColor,
    boxShadow: '0 0 15px #a09a9a',
    borderRadius: '5px',
  };
  return (
    <div style={styles}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
