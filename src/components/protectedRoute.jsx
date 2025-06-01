import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, requiredProgress = 0 }) => {
  const [isAllowed, setIsAllowed] = useState(null); // null = loading
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!token) {
        alert("Anda belum login.");
        setIsAllowed(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== role) {
          alert("Akses ditolak. Peran Anda tidak sesuai.");
          setIsAllowed(false);
          return;
        }

        // Jika role dosen, langsung izinkan tanpa cek progress
        if (decoded.role === "dosen") {
          setIsAllowed(true);
          return;
        }

        // Role selain dosen (misalnya mahasiswa) cek progress
        const res = await fetch("http://localhost:5000/progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          alert("Gagal mengambil data progres.");
          setIsAllowed(false);
          return;
        }

        const data = await res.json();
        const progress = data.progress;

        if (progress < requiredProgress) {
          alert("Materi ini belum bisa diakses. Selesaikan materi sebelumnya terlebih dahulu.");
          navigate("/dashboard");
          setIsAllowed(false);
        } else {
          setIsAllowed(true);
        }
      } catch (error) {
        console.error("Error checking access:", error);
        alert("Terjadi kesalahan saat memeriksa akses.");
        setIsAllowed(false);
      }
    };

    checkAccess();
  }, [token, role, requiredProgress, navigate]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
