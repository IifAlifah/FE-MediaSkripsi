import { Link } from "react-router-dom";
import Done from '../assets/done.png';

const PenutupEvaluasi = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div 
        className="card shadow-lg text-center p-4" 
        style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}
      >
        <h1 className="text-success fw-bold mb-3">Selamat!</h1>
        <img
          src={Done}
          alt="Selesai"
          className="mx-auto mb-4"
          style={{ maxHeight: "250px", objectFit: "contain" }}
        />
        <p className="fs-5 mb-4">
          Anda telah berhasil menyelesaikan <strong>seluruh materi</strong> yang tersedia dalam media pembelajaran ini.
        </p>
        <Link to="/dashboard" className="btn btn-primary btn-lg px-4">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PenutupEvaluasi;
