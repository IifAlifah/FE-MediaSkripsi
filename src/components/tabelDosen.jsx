import React, { useState } from "react";

const DataTable = ({ title, headers, data }) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [itemsPerPage, setItemsPerPage] = useState(5);  
  const [currentPage, setCurrentPage] = useState(1);  

  const filteredData = data.filter((row) => {
    return headers.some((header) => {
      const key = header.toLowerCase().replace(" ", "");
      if (row[key]) {
        return row[key].toString().toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-2">
      <h2 className="mb-4">{title}</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Cari data..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div>
          <label htmlFor="itemsPerPage" className="form-label">
            Tampilkan Data:
          </label>
          <select
            id="itemsPerPage"
            className="form-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                {headers.map((header, i) => {
                  const key = header.toLowerCase().replace(" ", "");
                  return <td key={i}>{row[key] !== undefined ? row[key] : "-"}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                Tidak ada data yang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Sebelumnya
        </button>

        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`btn btn-sm me-2 ${currentPage === pageNumber ? "btn-primary" : "btn-light"}`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default DataTable;
