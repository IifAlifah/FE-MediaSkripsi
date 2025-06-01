import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    nim: "", // Tambahkan NIM di state
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

useEffect(() => {
  const fetchData = async () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/mahasiswa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setUser({
          nama: data.user?.nama || "",
          email: data.user?.email || "",
          nim: data.nim || "",
          password: "",
          confirmPassword: "",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Gagal memuat data pengguna");
      setIsLoading(false);
    }
  };

  fetchData();
}, [id, token]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    const updatedData = {
      nama: user.nama,
      email: user.email,
      nim: user.nim,
      password: user.password ? user.password : undefined, // Kirim password hanya jika diisi
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/mahasiswa/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data berhasil diperbarui");
        navigate("/dataMahasiswa");
      }
    } catch (error) {
      console.error("Gagal mengedit data:", error);
      setError("Gagal mengedit data pengguna");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Data Pengguna</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            id="nama"
            value={user.nama}
            onChange={(e) => setUser({ ...user, nama: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nim" className="form-label">NIM</label>
          <input
            type="text"
            className="form-control"
            id="nim"
            value={user.nim}
            onChange={(e) => setUser({ ...user, nim: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditUserPage;
