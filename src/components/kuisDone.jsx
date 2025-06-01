import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const HasilKuis = () => {
  const location = useLocation();
  const { nextMaterialPath, prevMaterialPath, retryQuizPath } = location.state || {};
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(null);
  const [kkm, setKKM] = useState(null);


  const token = localStorage.getItem("token");
  let mahasiswaId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      mahasiswaId = decoded.mahasiswaId;
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }

  useEffect(() => {
    if (!mahasiswaId) return;

    const fetchNilai = async (jenisKuis) => {
      try {
        const res = await axios.get(`http://localhost:5000/nilai/${jenisKuis}`, {
          params: { mahasiswaId, jenisKuis: "Pengenalan DOM HTML" },
          headers: { Authorization:  `Bearer ${token}`},
        });
        setScoreData(res.data);
      } catch (err) {
        console.error("Gagal ambil data nilai:", err.response?.data || err.message);
      }
    };

    fetchNilai();
  }, [mahasiswaId, token]);

  useEffect(() => {
    if (!mahasiswaId) return;

    const fetchKKM = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/kkm/${mahasiswaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKKM(response.data.kkm);
      } catch (error) {
        console.error("Gagal fetch KKM:", error);
      }
    };

    fetchKKM();
  }, [mahasiswaId, token]);

  if (!scoreData || kkm === null) return <p>Memuat data hasil kuis...</p>;

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-sm border-0 p-4 rounded-4" style={{ backgroundColor: '#f7fbff', maxWidth: '600px', width: '100%' }}>
        <div className="card-header bg-primary text-white text-center rounded-3 mb-3">
          <h3 className="mb-0 fw-bold">Hasil Kuis</h3>
        </div>

        <div className="text-center mb-4">
          <h5 className="fw-semibold">Nilai</h5>
          <h1 className="text-primary fw-bold">{scoreData.nilai}</h1>
          <p>Jawaban Benar: {scoreData.benar}</p>
          <p>Jawaban Salah: {scoreData.salah}</p>
          <p
            className={`fs-5 fw-bold ${
              scoreData.nilai >= kkm ? "text-success" : "text-danger"
            }`}
          >
            Status: {scoreData.nilai >= kkm ? "Lulus " : "Belum Lulus"}
          </p>
        </div>

          <div className="d-flex flex-column gap-3 mt-4">
            {scoreData.nilai >= kkm ? (
              <>
                <div className="alert alert-success rounded-3">
                  Selamat! Kamu lulus dan dapat lanjut ke materi berikutnya.
                </div>
                <button className="btn btn-success w-100" onClick={() => navigate(nextMaterialPath)}>
                  Lanjut ke Materi Berikutnya
                </button>
              </>
            ) : (
              <>
                <div className="alert alert-danger rounded-3">
                  Skor kamu belum memenuhi KKM. Silakan ulangi kuis atau pelajari kembali materinya.
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-danger w-50" onClick={() => navigate(retryQuizPath)}>
                    Ulangi Kuis
                  </button>
                  <button className="btn btn-secondary w-50" onClick={() => navigate(prevMaterialPath)}>
                    Kembali ke Materi
                  </button>
                </div>
              </>
            )}
          </div>
          </div>
        </div>
  );
};

export default HasilKuis;