import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbarDosen";
import menuDataDosen from "../../data/menu/menuDataDosen";
import DataTable from "../../components/tabelDosen";
import { ProgressBar } from "react-bootstrap";

const DataMahasiswaPage = () => {
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Redirect jika tidak ada token
  useEffect(() => {
    if (!token) {
      console.error("Token tidak ditemukan di localStorage");
      window.location.href = "/login";
    }
  }, [token]);

  // Ambil data mahasiswa
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/mahasiswa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const formattedData = response.data.map((item, index) => ({
            no: index + 1,
            nama: item.user?.nama || "-",
            nim: item.nim,
            progress: Number(item.progress), // ubah ke angka
            id: item.id,
          }));
          setMahasiswaData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          console.error("Token expired or unauthorized.");
          window.location.href = "/login";
        }
      }
    };

    fetchData();
  }, [token]);

  // Fungsi untuk pindah ke halaman edit
  const handleEdit = (rowData) => {
    navigate(`/editMahasiswa/${rowData.id}`);
  };

  // Fungsi untuk menghapus data mahasiswa
  const handleDelete = (rowData) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`http://localhost:5000/mahasiswa/${rowData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setMahasiswaData((prevData) =>
            prevData.filter((item) => item.id !== rowData.id)
          );
        })
        .catch((err) => console.error("Gagal menghapus data:", err));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar">
          <Sidebar menuData={menuDataDosen} />
        </div>
        <div className="admin-content" style={{ flexGrow: 1, padding: "10px" }}>
          <DataTable
            title="Data Mahasiswa"
            headers={["No", "Nama", "NIM", "Progress", "Aksi"]}
            data={mahasiswaData.map((item) => {
              const percentage = Math.round((item.progress / 24) * 100);

              return {
                ...item,
                progress: (
                  <ProgressBar
                    now={percentage}
                    label={`${percentage}%`}
                    variant={
                      percentage >= 75
                        ? "success"
                        : percentage >= 50
                        ? "info"
                        : percentage >= 25
                        ? "warning"
                        : "danger"
                    }
                  />
                ),
                aksi: (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item)}
                    >
                      Hapus
                    </button>
                  </>
                ),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DataMahasiswaPage;
