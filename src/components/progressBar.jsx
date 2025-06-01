import React from "react";

const ProgressBar = ({ percentage = 0 }) => {
  return (
    <div
      style={{
        height: 20,
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#e0e0de",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percentage}%`,
          backgroundColor: "#4caf50",
          transition: "width 0.5s ease-in-out",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          lineHeight: "20px",
          fontSize: "0.9rem",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
