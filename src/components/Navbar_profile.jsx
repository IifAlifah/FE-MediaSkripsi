import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(""); // Tambahkan state role
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.nama || "Siswa");
        setRole(decoded.role || "mahasiswa"); // Ambil role dari token
      } catch (error) {
        console.error("Gagal mendecode token:", error);
        setUserName("Siswa");
        setRole("mahasiswa");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout", {
        withCredentials: true,
      });

      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light text-dark fixed-top border-bottom"
      style={{ zIndex: 1030 }}
    >
      <div className="container-fluid">
        {/* Toggler untuk dosen atau mahasiswa */}
        {role === "dosen" && (
          <button
            className="navbar-toggler ms-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {role === "mahasiswa" && (
          <button
            className="navbar-toggler ms-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMahasiswa"
            aria-controls="sidebarMahasiswa"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        <span className="navbar-brand fw-bold text-primary ms-3">
          BelajarDOM
        </span>

         <div className="position-absolute start-50 translate-middle-x d-flex align-items-center">
            <Link to="/dashboard" className="nav-link mx-3">
              Materi
            </Link>
            <Link to="/codeEditor" className="nav-link mx-3">
              Editor
            </Link>
          </div>

        <div className="ms-auto d-flex align-items-center me-3">
          <div className="dropdown d-flex align-items-center">
            <span className="d-none d-md-block">{userName}</span>
            <button
              className="btn btn-link p-0 m-0 ms-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Dropdown user menu"
              style={{ lineHeight: 1 }}
            >
              <i className="bi bi-caret-down-fill fs-6"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Keluar
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
