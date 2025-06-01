import React from "react";

const Header = ({ title, icon: Icon }) => {
  return (
    <div style={styles.header}>
      <div style={styles.titleContainer}>
        {Icon && <Icon style={styles.icon} />}
        <p style={styles.title}>{title}</p>
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "#007bff",
    padding: "10px 10px",
    borderRadius: "4px",
    textAlign: "left",
    marginBottom: "20px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  icon: {
    fontSize: "18px",
    color: "#ffffff",
  },
  title: {
    color: "#ffffff",
    margin: 0,
    fontSize: "18px",
  },
};

export default Header;
