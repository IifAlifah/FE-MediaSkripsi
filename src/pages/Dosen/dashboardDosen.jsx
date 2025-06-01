import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbarDosen";
import menuDataDosen from "../../data/menu/menuDataDosen";
import { FaUsers, FaCheckCircle } from "react-icons/fa";

const DashboardDosen = () => {
  const [kkm, setKkm] = useState("");
  const [tokenKelas, setTokenKelas] = useState(null);
  const [newKkm, setNewKkm] = useState("");
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState(null);
  const [jumlahMahasiswaSelesai, setJumlahMahasiswaSelesai] = useState(null);
  const [copied, setCopied] = useState(false);


  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token tidak ditemukan di localStorage");
        return;
      }

      try {
        const [kelasResponse, mahasiswaResponse, selesaiResponse] = await Promise.all([
          fetch("http://localhost:5000/token-kelas", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/jumlah-mahasiswa", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/progress/selesai", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Tambahkan handler untuk data selesai
        if (selesaiResponse.ok) {
          const data = await selesaiResponse.json();
          setJumlahMahasiswaSelesai(data.length);
        } else {
          console.error("Gagal mendapatkan data mahasiswa yang selesai");
        }


        if (kelasResponse.ok) {
          const data = await kelasResponse.json();
          setTokenKelas(data.tokenKelas);
          setKkm(data.kkm);
        } else {
          console.error("Gagal mendapatkan token kelas dan KKM");
        }

        if (mahasiswaResponse.ok) {
          const data = await mahasiswaResponse.json();
          setJumlahMahasiswa(data.jumlahMahasiswa);
        } else {
          console.error("Gagal mendapatkan jumlah mahasiswa");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleNewKkmChange = (e) => {
    setNewKkm(e.target.value);
  };

  const handleSubmitKkm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/update-kkm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ kkm: newKkm }),
      });

      if (response.ok) {
        const data = await response.json();
        setKkm(data.kkm);
        setNewKkm("");
        alert("Nilai KKM berhasil diperbarui");
      } else {
        alert("Gagal memperbarui nilai KKM");
      }
    } catch (error) {
      console.error("Error updating KKM:", error);
    }
  };

  const handleCopy = () => {
      if (tokenKelas) {
        navigator.clipboard.writeText(tokenKelas);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset setelah 2 detik
      }
    };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar-wrapper">
          <Sidebar menuData={menuDataDosen} />
        </div>

        <div className="admin-content flex-grow-1 container-fluid">
          <h2 className="mb-4 text-primary">Dashboard Dosen</h2>

          {/* two Boxes */}
          <div className="row g-4">
                <div className="col-md-6 col-12">
                  <div
                    className="card bg-info text-white shadow-lg border-0"
                    style={{ height: "150px" }}
                  >
                    <div className="card-body rounded-3 d-flex flex-column justify-content-center align-items-center">
                      <h5 className="card-title d-flex align-items-center gap-2">
                        <FaUsers size={34} />
                        Jumlah Mahasiswa
                      </h5>
                      <p style={{ fontSize: "4rem", fontWeight: "bold" }}>
                        {jumlahMahasiswa !== null ? jumlahMahasiswa : "Memuat..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div
                    className="card bg-warning text-white shadow-lg border-0"
                    style={{ height: "150px" }}
                  >
                    <div className="card-body rounded-3 d-flex flex-column justify-content-center align-items-center">
                      <h5 className="card-title d-flex align-items-center gap-2">
                        <FaCheckCircle size={34} />
                        Mahasiswa Selesai
                      </h5>
                      <p style={{ fontSize: "4rem", fontWeight: "bold" }}>
                        {jumlahMahasiswaSelesai !== null ? jumlahMahasiswaSelesai : "Memuat..."}
                      </p>
                    </div>
                  </div>
                </div>
          </div>

          {/* Token Kelas dan Nilai KKM */}
          <div className="row g-4 mt-3">
            {/* Token Kelas */}
            <div className="col-md-6 col-12">
              <div className="card bg-light shadow-sm border-0 h-100">
                  <div className="card-body rounded-3 d-flex flex-column justify-content-center align-items-center text-center">
                    <h5 className="card-title mb-3">
                      <i className="bi bi-key-fill me-2 text-primary"></i>Token Kelas
                    </h5>

                    {tokenKelas ? (
                    <>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <p
                          className="text-primary fw-bold mb-0"
                          style={{ fontSize: "1.5rem", wordBreak: "break-word" }}
                      >
                      {tokenKelas}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="btn btn-outline-primary btn-sm"
                        title="Salin Token"
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                    {copied && (
                      <small className="text-success mt-2">
                          Token berhasil disalin!
                      </small>
                    )}
                    </>
                    ) : (
                      <p className="text-muted">Token kelas tidak ditemukan.</p>
                    )}
                  </div>
              </div>
            </div>

            {/* Nilai KKM */}
            <div className="col-md-6 col-12">
              <div className="card bg-light shadow-sm border-0 h-100">
                <div className="card-body rounded-3">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-clipboard-check-fill me-2 text-primary"></i>Nilai KKM
                  </h5>

                  <p className="fs-5 fw-semibold text-primary mt-2 mb-2">{kkm}</p>

                  <form onSubmit={handleSubmitKkm}>
                    <div className="mb-3">
                      <label htmlFor="kkmInput" className="form-label text-dark fw-semibold">
                        Perbarui Nilai KKM
                      </label>
                      <input
                        type="number"
                        className="form-control rounded-3"
                        id="kkmInput"
                        value={newKkm}
                        onChange={handleNewKkmChange}
                        min="0"
                        max="100"
                        placeholder="Masukkan Nilai KKM"
                      />
                      <div className="form-text text-muted">Nilai KKM berada antara 0–100</div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-3">
                      Simpan Nilai KKM
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>  
    </div>
  );
};

export default DashboardDosen;
