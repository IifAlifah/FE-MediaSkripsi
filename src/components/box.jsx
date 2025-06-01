import React from 'react';
import GambarAktivitas from './gambarAktivitas';

const ActivityBox = ({ aktivitas }) => {
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
    marginRight: '40px',
    marginLeft: '40px',
    border: '2px solid #1F4E79', 
  },
  aktivitas: {
    fontSize: '18px',
    color: '#343a40',
  },
};

export default ActivityBox;
