import React from 'react';

const TujuanPembelajaran = ({ tujuan }) => {
  return (
    <div className="container-fluid mt-4 mb-2">
      <div className="card shadow-sm border-primary ms-2 me-2" 
       style={{
        backgroundColor: '#f1f1f1', 
        border: '2px dashed ', 
      }}>
        <div className="card-body">
          <h5 className="card-title mb-3 bg-primary p-2 border-bottom text-white">Tujuan Pembelajaran</h5>
          <p className="card-text" style={{fontSize: "18px"}}>{tujuan}</p>
        </div>
      </div>
    </div>
  );
};

export default TujuanPembelajaran;
