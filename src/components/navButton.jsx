import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({
  prevLink,
  nextLink,
  prevLabel = "Sebelumnya",
  nextLabel = "Selanjutnya",
  useModal = false,
  onNextClick,
}) => {
  return (
    <div className="d-flex justify-content-between ms-4 me-4 mt-5">
      <Link to={prevLink} className="btn btn-secondary">
        {prevLabel}
      </Link>
      {useModal ? (
        <button className="btn btn-warning text-white" onClick={onNextClick}>
          {nextLabel}
        </button>
      ) : (
        <Link to={nextLink} className="btn btn-warning text-white">
          {nextLabel}
        </Link>
      )}
    </div>
  );
};

export default NavButton;
