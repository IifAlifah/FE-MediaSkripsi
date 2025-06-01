import React from "react";

const GambarAktivitas = ({ src, alt }) => {
  return (
    <div style={{ textAliGn: "left"}}>
      <img
        src={src}
        alt={alt}
        style={{ width: "35%",  marginBottom: "10px" }}
      />
    </div>
  );
};

export default GambarAktivitas;
