// File: components/ImageComponent.jsx
import React from "react";

const Gambar = ({ src, alt, caption }) => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <img
        src={src}
        alt={alt}
        style={{ width: "70%",  marginBottom: "10px" }}
      />
       <p style={{ fontStyle: "italic" }}>{caption}</p>
    </div>
  );
};

export default Gambar;
