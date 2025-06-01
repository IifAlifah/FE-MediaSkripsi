import React from 'react';

const Tabel = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="text-center">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'table-primary' : 'table-light'}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="text-center">{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
