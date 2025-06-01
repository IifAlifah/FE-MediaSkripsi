import { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import register from '../assets/register.png';
import Navbar from "../components/Navbar";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Footer from "../components/Footer";
import axios from "axios";
import Swal from 'sweetalert2';


const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nim: '',
    nip: '',
    tokenKelas: '',
    password: '',
    konfPassword: '',
    role: '' // Default empty, no role selected
  });

  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      role: value,
      nim: '', 
      nip: '', 
      tokenKelas: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      Swal.fire({
      icon: 'warning',
      title: 'Role belum dipilih',
      text: 'Harap pilih role terlebih dahulu.',
    });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users", formData);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: response.data.msg,
      }).then(() => {
        setFormData({
          nama: '',
          email: '',
          nim: '',
          nip: '',
          tokenKelas: '',
          password: '',
          konfPassword: '',
          role: '' // Reset role to empty
        });
        navigate("/login"); // ← Arahkan ke halaman login setelah sukses
      });
      } catch (error) {
       if (error.response) {
        const errorMessage = error.response.data.msg;

        if (errorMessage === "Email sudah terdaftar") {
          Swal.fire({
            icon: 'error',
            title: 'Email Terdaftar',
            text: 'Email ini sudah digunakan. Gunakan email lain.',
          });
        } else if (errorMessage === "Password dan Konfirmasi Password tidak cocok") {
          Swal.fire({
            icon: 'warning',
            title: 'Password Tidak Cocok',
            text: 'Pastikan kata sandi dan konfirmasinya sama.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: errorMessage,
          });
        }
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
              src={register}
              alt="Register"
              className="img-fluid"
              style={{ maxHeight: "400px" }}
            />
          </Col>
          <Col xs={12} md={6} className="p-5">
            <h3 className="text-center text-primary mb-4">DAFTAR</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNama" className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama"
                  value={formData.nama}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                >
                  <option value="">Pilih Role</option> {/* Initial empty or "Pilih Role" */}
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="dosen">Dosen</option>
                </Form.Control>
              </Form.Group>

              {formData.role === 'mahasiswa' && (
                <>
                  <Form.Group controlId="formNIM" className="mb-3">
                    <Form.Label>NIM</Form.Label>
                    <Form.Control
                      type="text"
                      name="nim"
                      placeholder="Masukkan NIM"
                      value={formData.nim}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formTokenKelas" className="mb-3">
                    <Form.Label>Token Kelas</Form.Label>
                    <Form.Control
                      type="text"
                      name="token_kelas"
                      placeholder="Masukkan token kelas"
                      value={formData.token_kelas}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}

              {formData.role === 'dosen' && (
                <Form.Group controlId="formNIP" className="mb-3">
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    type="text"
                    name="nip"
                    placeholder="Masukkan NIP"
                    value={formData.nip}
                    onChange={handleChange}
                  />
                </Form.Group>
              )}

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Kata Sandi</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Masukkan kata sandi"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={togglePasswordVisibility}
                    style={{ height: "38px", margin: "0" }}
                  >
                    {passwordVisible ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Konfirmasi Kata Sandi</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="konfPassword"
                    placeholder="Konfirmasi kata sandi"
                    value={formData.konfPassword}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ height: "38px", margin: "0" }}
                  >
                    {confirmPasswordVisible ? <EyeSlash /> : <Eye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-2">
                Daftar
              </Button>

              <div className="mt-3 text-center">
                <span>Sudah punya akun? </span>
                <Link to="/login">Masuk</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
