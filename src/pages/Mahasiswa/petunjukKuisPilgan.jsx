import React from 'react';

const KuisPetunjuk
 = () => {
  const instructions = [
    'Terdapat 10 soal pilihan ganda pada kuis ini. Untuk memulai mengerjakan kuis, tekan tombol "MULAI".',
    'Waktu pengerjaan soal adalah 25 menit, terdapat timer pada bagian kanan atas.',
    'Pada sisi kiri terdapat navigasi soal dan pada sisi bagian kanan terdapat soal dan pilihan jawaban.',
    'Jika seluruh soal sudah dikerjakan, tekan tombol "SELESAI" yang aktif. Jika waktu pengerjaan soal habis maka laman soal akan otomatis tertutup dan akan diarahkan ke halaman hasil.',
    'Jika keluar ketika sedang mengerjakan kuis, semua jawaban yang sudah diketikkan tidak akan disimpan dan harus menjawab ulang dari awal.'
  ];

  const handleMulai = () => {
    // Navigasi ke halaman pengerjaan kuis
    console.log('Navigasi ke halaman pengerjaan kuis...');
  };

  const handleKembali = () => {
    // Navigasi ke halaman sebelumnya
    console.log('Navigasi ke halaman sebelumnya...');
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold" style={{ color: '#7b2cbf' }}>KUIS 3</h2>
      <h5 className="mb-4">Tipe Data</h5>
      <hr />
      <div className="card mx-auto" style={{ maxWidth: '750px' }}>
        <div className="card-body text-start">
          <h5 className="fw-bold text-center mb-3">Petunjuk Pengerjaan Kuis</h5>
          <ol>
            {instructions.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button onClick={handleMulai} className="btn btn-primary px-4" style={{ backgroundColor: '#9d4edd', border: 'none' }}>
          MULAI
        </button>
        <button onClick={handleKembali} className="btn btn-outline-primary px-4">
          KEMBALI
        </button>
      </div>
    </div>
  );
};

export default KuisPetunjuk;
