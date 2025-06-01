const ModalSelesaiMateri = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      role="dialog" 
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-4 text-center">
          <h5 className="modal-title mb-3">Selamat!</h5>
          <p>Kamu telah menyelesaikan materi ini.</p>
          <button className="btn btn-primary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
