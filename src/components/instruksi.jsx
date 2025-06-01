import React from 'react';
import GambarAktivitas from './gambarAktivitas';

const Instruksi = ({ aktivitas }) => {
  return (
    <div className="activity-box p-2" style={styles.box}>
      <p style={styles.aktivitas}>{aktivitas}</p>
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    marginRight: '20px',
    marginLeft: '20px',
    border: '2px solid #1F4E79', 
  },
  aktivitas: {
    fontSize: '17px',
    color: '#343a40',
    lineHeight: "1.8",
  },
};

export default Instruksi;
