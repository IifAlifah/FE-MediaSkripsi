const Materi = ({ title, description }) => {
  return (
    <div className="p-3">
      <h2>{title}</h2>
      <div style={{ textAlign: "justify", fontSize: "17px", lineHeight: "1.8" }}>
        {description}
      </div>
    </div>
  );
};

export default Materi;
