import React from "react";

const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{
        margin: "0 5px",
        padding: "5px",
        width: "100px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default Input;
