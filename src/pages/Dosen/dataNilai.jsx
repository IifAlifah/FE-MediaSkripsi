import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbarDosen";
import Tabel from "../../components/tabelDosen";
import menuDataDosen from "../../data/menu/menuDataDosen";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DataNilaiPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [kkm, setKkm] = useState(70);
  

  const kuisOptions = [
    "Pendahuluan",
    "Mengakses Elemen",
    "Manipulasi Konten",
    "Event DOM",
    "Form DOM",
    "Evaluasi",
  ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/token-kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setKkm(res.data.kkm);
      })
      .catch((err) => {
        console.error("Gagal mengambil nilai KKM:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedQuiz !== "") {
      fetchNilai(selectedQuiz);
    }
  }, [selectedQuiz]);

  const fetchNilai = async (jenisKuis) => {
    try {
      const response = await axios.get(`http://localhost:5000/nilai/jenis/${jenisKuis}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Gagal fetch nilai:', error);
    }
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const showDetail = (mahasiswaId) => {
    axios
      .get(`http://localhost:5000/nilai/jenis/${encodeURIComponent(selectedQuiz)}/mahasiswa/${mahasiswaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailData(res.data);
        setModalShow(true);
      })
      .catch((err) => console.error("Gagal fetch detail:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/nilai/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchNilai(selectedQuiz);
      })
      .catch((err) => console.error("Gagal menghapus:", err));
  };

  const cetakPDF = () => {
    const doc = new jsPDF();

    // Judul
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Laporan Data Nilai Kuis", 105, 15, { align: "center" });

    // Informasi Umum
    doc.setFontSize(12);
    doc.text(`Jenis Kuis: ${selectedQuiz}`, 14, 25);
    doc.text(`KKM: ${kkm}`, 14, 32);

    // Tabel
    autoTable(doc, {
      startY: 40,
      head: [["No", "Nama", "NIM", "Nilai Terakhir", "Status"]],
      body: data.map((item, index) => [
        index + 1,
        item.Mahasiswa?.user?.nama || "-",
        item.Mahasiswa?.nim || "-",
        item.nilai !== null ? item.nilai : "-",
        item.nilai >= kkm ? "Tuntas" : "Belum Tuntas",
      ]),
      theme: 'grid',
      styles: {
        fontSize: 10,
        halign: 'center',
        valign: 'middle',
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        1: { halign: 'left' }, // Nama kiri
        2: { halign: 'center' }, // NIM tengah
        3: { halign: 'center' }, // Nilai tengah
        4: { halign: 'center' }, // Status tengah
      },
    });

    doc.save(`nilai_${selectedQuiz}.pdf`);
  };


  const headers = ["No", "Nama", "NIM", "Nilai Terakhir", "Aksi"];
  const rows = data.map((row, index) => ({
    no: index + 1,
    nama: row.Mahasiswa?.user?.nama || "-",
    nim: row.Mahasiswa?.nim || "-",
    nilaiterakhir: row.nilai,
    aksi: (
      <>
        <button className="btn btn-info btn-sm me-1" onClick={() => showDetail(row.mahasiswaId)}>
          Detail
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
          Hapus
        </button>
      </>
    ),
  }));

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        {!modalShow && (
          <div className="sidebar">
            <Sidebar menuData={menuDataDosen} />
          </div>
        )}

        <div className="admin-content" style={{ flexGrow: 1, padding: "10px" }}>
          <h2 className="mb-4 ms-4">Data Nilai Kuis</h2>
          <div className="mb-4 ms-4 me-4 d-flex align-items-center">
            <label htmlFor="quizSelect" className="form-label me-3" style={{ whiteSpace: "nowrap" }}>
              Pilih nilai kuis:
            </label>
            <select value={selectedQuiz} onChange={handleQuizChange} className="form-select">
              <option value="">---</option>
              {kuisOptions.map((quiz, i) => (
                <option key={i} value={quiz}>
                  {quiz}
                </option>
              ))}
            </select>

            {selectedQuiz && (
              <button
                className="btn btn-primary ms-3"
                style={{ padding: "4px 8px", fontSize: "0.8rem", lineHeight: "1.2" }}
                onClick={cetakPDF}
              >
                Export PDF
              </button>
            )}
          </div>

          <Tabel headers={headers} data={rows} />

          <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Detail Riwayat Nilai</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Benar</th>
                    <th>Salah</th>
                    <th>Nilai</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {detailData.map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.waktu_pengerjaan).toLocaleString()}</td>
                      <td>{item.benar}</td>
                      <td>{item.salah}</td>
                      <td>{item.nilai}</td>
                      <td>{item.nilai >= kkm ? "Tuntas" : "Belum Tuntas"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DataNilaiPage;
