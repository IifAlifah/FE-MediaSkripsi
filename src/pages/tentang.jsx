import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Tentang = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-bold">
          Pengembangan Media Pembelajaran Interaktif Berbasis Web pada Materi DOM HTML dengan Metode Tutorial
        </h3>

        {/* Card Identitas Pengembang */}
        <div className="card border rounded shadow-sm mb-4">
        <div className="card-header bg-light d-flex align-items-center p-3">
            <h5 className="mb-0 fw-semibold">IDENTITAS PENGEMBANG</h5>
        </div>
        <div className="card-body p-4">
        <table className="table table-borderless fs-5 mb-0">
            <tbody>
            <tr>
                <td className="fw-bold" style={{ width: "300px" }}>Nama</td>
                <td style={{ width: "10px" }}>:</td>
                <td>Iif Alifah</td>
            </tr>
            <tr>
                <td className="fw-bold">Dosen Pembimbing 1</td>
                <td>:</td>
                <td>Dr. Harja Santana Purba, M. Kom</td>
            </tr>
            <tr>
                <td className="fw-bold">Dosen Pembimbing 2</td>
                <td>:</td>
                <td>Novan Alkaf Bahraini Saputra, S. Kom, M. T</td>
            </tr>
            <tr>
                <td className="fw-bold">Program Studi</td>
                <td>:</td>
                <td>Pendidikan Komputer</td>
            </tr>
            <tr>
                <td className="fw-bold">Fakultas</td>
                <td>:</td>
                <td>Fakultas Keguruan dan Ilmu Pendidikan</td>
            </tr>
            <tr>
                <td className="fw-bold">Universitas</td>
                <td>:</td>
                <td>Universitas Lambung Mangkurat</td>
            </tr>
            <tr>
                <td className="fw-bold">Email</td>
                <td>:</td>
                <td>
                <a href="mailto:iifalifah11@gmail.com" className="text-decoration-none text-primary">
                    iifalifah11@gmail.com
                </a>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        </div>

        {/* Card Daftar Pustaka */}
        <div className="card border rounded shadow-sm">
        <div className="card-header bg-light d-flex align-items-center p-3">
            <h5 className="mb-0 fw-semibold">DAFTAR PUSTAKA</h5>
        </div>
        <div className="card-body fs-6 mt-2">
            <p className="mb-2">
            Flanagan, D. (2011). <i>JavaScript: The Definitive Guide</i>. O'Reilly Media.
            </p>
            <p className="mb-2">
            Keith, J. (2005). <i>Dom Scripting: Web Design with JavaScript and the Document Object Model</i>. Friends of ED.
            </p>
            <p className="mb-0">
            Ilustrasi pada media pembelajaran dari{" "}
            <a href="https://storyset.com/work" target="_blank" rel="noopener noreferrer">
                storyset.com/work
            </a>.
            </p>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tentang;
