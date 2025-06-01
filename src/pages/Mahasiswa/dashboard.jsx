import { Container, Row, Col, Card, ProgressBar, Badge } from "react-bootstrap";
import SidebarMahasiswa from "../../components/sidebarMahasiswa";
import Navbar from "../../components/Navbar_profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashboardMateri = () => {
  const [mahasiswaId, setMahasiswaId] = useState(null);
  const [nilaiKuis, setNilaiKuis] = useState([]);
  const [progress, setProgress] = useState(0);

  const kuisList = [
    "Pendahuluan",
    "Mengakses Elemen",
    "Manipulasi Konten",
    "Event DOM",
    "Form DOM",
    "Evaluasi",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setMahasiswaId(decoded.mahasiswaId);
    } catch (err) {
      console.error("Gagal decode token:", err);
    }
  }, []);

  useEffect(() => {
    const fetchNilai = async () => {
      try {
        const token = localStorage.getItem("token");

        const promises = kuisList.map(async (jenisKuis) => {
          try {
            const res = await axios.get("http://localhost:5000/nilai/terbaru", {
              headers: { Authorization: `Bearer ${token}` },
              params: { mahasiswaId, jenisKuis },
            });
            return { jenisKuis, nilai: res.data.nilai };
          } catch (err) {
            return { jenisKuis, nilai: null };
          }
        });

        const results = await Promise.all(promises);
        setNilaiKuis(results);
      } catch (err) {
        console.error("Gagal mengambil nilai:", err);
      }
    };

    if (mahasiswaId) {
      fetchNilai();
    }
  }, [mahasiswaId]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProgress(data.progress);
      } catch (err) {
        console.error("Gagal mengambil progress:", err);
      }
    };

    fetchProgress();
  }, []);

  const getNilaiTerakhir = (jenisKuis) => {
    const data = nilaiKuis.find((item) => item.jenisKuis === jenisKuis);
    return data ? data.nilai : null;
  };

  const percentage = Math.round((progress / 24) * 100);

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-column flex-md-row">
        <div className="sidebar-wrapper">
          <SidebarMahasiswa />
        </div>
        <div className="main-content content-wrapper container-fluid p-2">
          <h3 className="mb-4">Dashboard</h3>

          <div
            className="my-4 mx-2 p-3"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p className="mb-2 fw-semibold">Progress Belajar:</p>
            <ProgressBar now={percentage} label={`${percentage}%`} />
          </div>

          <Container className="mt-3">
            <Row>
              {kuisList.map((kuis, index) => (
                <Col key={index} xs={12} md={6} className="mb-4">
                  <Card
                    style={{
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      borderRadius: "10px",
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="fw-bold">{kuis}</Card.Title>
                      <Card.Text className="mt-2">
                        {getNilaiTerakhir(kuis) !== null ? (
                          <>
                            Nilai Terakhir:
                            <Badge bg="success" className="ms-2">
                              {getNilaiTerakhir(kuis)}
                            </Badge>
                          </>
                        ) : (
                          <Badge bg="secondary">Belum dikerjakan</Badge>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardMateri;
