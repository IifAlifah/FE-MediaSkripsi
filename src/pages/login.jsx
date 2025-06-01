import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import login from '../assets/login.png';
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Eye, EyeSlash } from 'react-bootstrap-icons'; 
import Footer from "../components/Footer";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';


const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/login", formData);
    const token = response.data.accessToken;

    // Simpan hanya token ke localStorage
    localStorage.setItem("token", token);

    // Decode token jika butuh informasi
    const decoded = jwtDecode(token);
    console.log(decoded);

    // Jika mahasiswa, ambil progress (tidak perlu disimpan di localStorage)
    if (decoded.role === "mahasiswa") {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const progressResponse = await axios.get("http://localhost:5000/progress", config);
        const userProgress = progressResponse.data.progress;
        console.log("Progress:", userProgress);
        // Jika perlu, kamu bisa set ke state global atau context di sini
      } catch (progressError) {
        console.warn("Gagal ambil progress:", progressError);
      }
    }

     Swal.fire({
      icon: "success",
      title: "Login Berhasil",
    });

    // Navigasi sesuai role
    if (decoded.role === "dosen") {
      navigate("/dashboardDosen");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.msg) {
      // Tampilkan pesan error spesifik dari backend
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response.data.msg,
      });
    } else {
      // Pesan default kalau error tidak diketahui
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Terjadi kesalahan saat login. Silakan coba lagi.",
      });
    }
  }
};


  return (
    <>
      <Navbar />
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 align-items-center">
          <Col xs={12} md={6} className="d-flex justify-content-center align-items-center text-white p-4">
            <img
              src={login}
              alt="Login"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </Col>

          <Col xs={12} md={6} className="p-5">
            <h3 className="text-center text-primary mb-4">MASUK</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Masukkan Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Kata Sandi</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Kata Sandi"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={togglePasswordVisibility}
                    style={{ margin: "0", height: "38px" }}
                  >
                    {passwordVisible ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-2">
                Masuk
              </Button>

              <div className="mt-3 text-center">
                <span>Belum punya akun? </span>
                <Link to="/register">Daftar di sini</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
