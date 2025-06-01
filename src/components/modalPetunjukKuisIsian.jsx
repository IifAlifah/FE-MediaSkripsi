import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/modalPetunjukKuis.css";


const ModalPetunjukKuisIsian = ({ show, onClose, bab = "", kuis = 1, routeMulai }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleMulai = () => {
    navigate(routeMulai);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box shadow">
        <h3 className="text-center fw-bold text-purple">KUIS {kuis}</h3>
        <p className="text-center fs-5 mb-4">{bab}</p>

        <div className="card p-4">
          <h5 className="fw-bold text-center mb-3">Petunjuk Pengerjaan Kuis</h5>
          <ol className="petunjuk-list">
            <li>Kuis ini terdiri dari 5 soal isian. Untuk memulai, silakan tekan tombol <b>MULAI</b>.</li>
            <li><b>Perhatikan penulisan huruf besar dan kecil (case sensitive)</b> saat menjawab soal. Jawaban dengan huruf yang tidak sesuai bisa dianggap salah.</li>
            <li>Durasi pengerjaan kuis adalah 45 menit, dengan penunjuk waktu yang ditampilkan di bagian kanan atas.</li>
            <li>Navigasi soal tersedia di sisi kiri layar, sedangkan pertanyaan dan teks editor dapat ditemukan di sisi kanan.</li>
            <li>Setelah semua soal dijawab, tombol <b>SELESAI</b> akan aktif dan bisa ditekan. Jika waktu habis, halaman kuis akan tertutup otomatis dan sistem akan mengarahkan ke halaman hasil.</li>
            <li>Apabila keluar dari halaman saat kuis berlangsung, semua jawaban yang telah dipilih tidak akan tersimpan dan pengerjaan harus diulang dari awal.</li>
          </ol>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-2">
          <button className="btn btn-primary" onClick={handleMulai}>MULAI</button>
          <button className="btn btn-secondary" onClick={onClose}>KEMBALI</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPetunjukKuisIsian;
