import { Link } from "react-router-dom";
import gambarDom from "../assets/gambarDom.png";
import imgBelajar from "../assets/belajar.png";
import imgLatihan from "../assets/Latihan.png";
import imgEvaluasi from "../assets/Evaluasi.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5 px-3">
        <div className="row align-items-center">
          <div className="col-md-4 mb-4">
            <img 
              src={gambarDom} 
              alt="Ilustrasi Belajar" 
              className="img-fluid w-100 rounded"
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-primary">MEDIA PEMBELAJARAN INTERAKTIF</h2>
            <h3 className="fw-bold mb-3">DOM HTML</h3>
            <p className="text-muted fs-5">
              Selamat datang di media pembelajaran DOM HTML! Media ini dirancang untuk membantu Anda
              memahami dan menguasai Document Object Model (DOM) HTML. Diperkaya dengan panduan interaktif dan contoh kode langsung.
            </p>
            <div className="mt-4">
              <Link to="/login">
                <button className="btn btn-primary me-2">MULAI SEKARANG</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="text-primary text-center">FITUR- FITUR</h3>
          </div>
        </div>

        <div className="row mt-4 mb-5">
          <div className="col-md-4 mb-4">
            <div className="card border-primary">
              <img
                src={imgBelajar}
                alt="Materi"
                className="card-img-top w-50 mx-auto" 
              />
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Materi</h5>
                <p className="card-text">
                  Akses materi pembelajaran DOM JavaScript untuk membantu Anda memahami konsep-konsep dasar.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-primary">
              <img
                src={imgLatihan}
                alt="Latihan"
                className="card-img-top w-50 mx-auto" 
              />
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Latihan Interaktif</h5>
                <p className="card-text">
                  Latihan interaktif untuk menguji pemahaman Anda tentang DOM JavaScript secara langsung.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-primary">
              <img
                src={imgEvaluasi}
                alt="Evaluasi"
                className="card-img-top w-50 mx-auto"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Evaluasi</h5>
                <p className="card-text">
                  Evaluasi untuk mengukur kemajuan dan pemahaman Anda terhadap konsep-konsep DOM JavaScript.
                </p>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
