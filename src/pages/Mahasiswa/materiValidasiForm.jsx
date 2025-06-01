import { useState, useEffect} from "react"; 
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import KodeEditor from "../../components/kodeEditor.jsx";
import Tabel from "../../components/tabel.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import ModalPetunjukKuis from "../../components/modalPetunjukKuisPilgan.jsx";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MateriValidasiForm = () => {
  const [showModal, setShowModal] = useState(false); 
  const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(21); // halaman saat ini
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const updateProgress = async () => {
  try {
    const response = await axios.patch(
      "http://localhost:5000/progress/update",
      {}, // bisa ditambah body kalau backend butuh nilai progress tertentu
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Progress berhasil diperbarui");

      // ✅ Update state progress secara lokal
      const newProgress = halamanAktif + 1; // atau sesuai dengan logika kamu
      setProgress(newProgress);
    }
  } catch (error) {
    console.error("Gagal update progress:", error);
  }
};

  useEffect(() => {
    // Fetch progress dari backend saat komponen mount
    const fetchProgress = async () => {
      const response = await fetch("http://localhost:5000/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProgress(data.progress); // update state
    };
    fetchProgress();
  }, []);

    const handleNextClick = () => {
      setShowModal(true);
    };


    const columnValidation = ['Jenis Validasi', 'Deskripsi', 'Properti yang Digunakan', 'Contoh'];
    const dataValidation = [
    ['Validasi Wajib', 'Memastikan bahwa suatu input tidak kosong.', 'required', 'Nama, email, nomor telepon'],
    ['Validasi Panjang Teks', 'Memeriksa apakah jumlah karakter memenuhi batas minimum/maksimum', 'minlength, maxlength', 'Kata sandi minimal 8 karakter'],
    ['Validasi Angka', 'Memastikan bahwa hanya angka yang dapat dimasukkan.', 'type="number"', 'Umur, nomor telepon'],
    ['Validasi Email', 'Memeriksa apakah format email sesuai standar.', 'type="email"', 'example@email.com'],
    ];


  const tujuanBelajar = (
    <>
    <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
    <ul>
      <li>Memahami dan menerapkan validasi input form menggunakan JavaScript.</li>
    </ul>
    </>
  );
  const materiContent = 
  <>
    <Header title="Validasi Form" />
    <p>Validasi formulir adalah proses memastikan bahwa data yang dimasukkan oleh pengguna sesuai dengan format yang diharapkan sebelum dikirim ke server. Validasi ini bertujuan untuk mencegah kesalahan input yang dapat menyebabkan masalah dalam pemrosesan data.</p>

    <p>Validasi dapat dilakukan dengan dua cara:</p>
    <ul>
    <li><strong>Validasi sisi klien (Client-Side Validation):</strong> Dilakukan menggunakan JavaScript untuk memberikan umpan balik langsung kepada pengguna tanpa harus mengirim data ke server.</li>
    <li><strong>Validasi sisi server (Server-Side Validation):</strong> Dilakukan di backend untuk memastikan data tetap aman dan sesuai standar sebelum diproses lebih lanjut.</li>
    </ul>

    <p>Berikut beberapa jenis validasi form yang umum digunakan:</p>
    <Tabel columns={columnValidation} data={dataValidation} />

    <p>Perhatikan kode di bawah ini!</p>
<KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <form onsubmit="return validasiNama()">
        <label for="nama">Nama:</label>
        <input type="text" id="nama">
        <button type="submit">Kirim</button>
    </form>
    
    <script>
    function validasiNama() {
        let nama = document.getElementById("nama").value;
        if (nama === "") {
            alert("Nama harus diisi!");
            return false; 
        }
        return true;
    }
    </script>
</body>
</html>`}
        runnable={true}
        editorId="editor1" 
        />
        <p>Kode di atas merupakan contoh validasi form sederhana menggunakan JavaScript. Formulir memiliki input teks untuk nama dan tombol "Kirim". Saat tombol ditekan, event <code>onsubmit</code> pada form akan memanggil fungsi <code>validasiNama()</code>.</p>

        <p>Fungsi ini mengambil nilai dari input dengan <code>id="nama"</code> menggunakan <code>document.getElementById("nama").value</code>. Jika nilai tersebut kosong, maka akan muncul peringatan <code>"Nama harus diisi!"</code> menggunakan <code>alert()</code>, dan fungsi mengembalikan <code>false</code> sehingga form tidak dikirim.</p>

        <p>Jika input telah diisi, fungsi mengembalikan <code>true</code>, memungkinkan form dikirim. Validasi ini bertujuan untuk memastikan pengguna tidak mengirim form dalam keadaan kosong, sehingga data yang dikirim lebih valid dan terhindar dari kesalahan pengisian.</p>

        </>

  const questions = [
  {
    id: 1,
    question: "Perhatikan kode berikut ini. Yang terjadi jika pengguna memasukkan \"abc\" ke dalam input umur adalah ....",
    image: "/Aktivitas/aktivitas5_no1.png",
    options: [
      "Form tetap dikirim",
      "Pesan \"Umur harus berupa angka!\" akan muncul",
      "Pesan \"Kamu harus berusia minimal 18 tahun!\" akan muncul",
      "Input otomatis diubah menjadi nol",
      "Halaman menjadi crash"
    ],
    correctAnswer: "Pesan \"Umur harus berupa angka!\" akan muncul",
    feedback: "parseInt(\"abc\") menghasilkan NaN, sehingga kondisi isNaN(age) menjadi true dan akan menampilkan pesan kesalahan."
  },
  {
    id: 2,
    question: "Kamu diminta membuat form input usia yang hanya menerima angka antara 18 hingga 60. Cara terbaik untuk memvalidasi ini dengan JavaScript adalah ....",
    options: [
      'Menggunakan type="text" dan memeriksa panjang input',
      'Menggunakan type="email" agar data lebih aman',
      'Menggunakan type="number" dan memeriksa nilai dengan kondisi if',
      'Menambahkan maxlength="2" agar tidak lebih dari 2 digit',
      'Menggunakan required saja sudah cukup'
    ],
    correctAnswer: 'Menggunakan type="number" dan memeriksa nilai dengan kondisi if',
    feedback: 'type="number" membatasi input ke angka, dan JavaScript dapat digunakan untuk memeriksa apakah nilai berada dalam rentang 18–60.'
  },
  {
    id: 3,
    question: 'Jika input memiliki type="email", validasi yang terjadi yaitu …. ',
    options: [
      "Memastikan input hanya berisi angka",
      'Memeriksa apakah input mengandung simbol "@" dan format email yang valid',
      "Membatasi panjang karakter maksimal",
      "Memaksa input hanya menerima huruf kecil",
      "Mencegah pengguna memasukkan karakter khusus"
    ],
    correctAnswer: 'Memeriksa apakah input mengandung simbol "@" dan format email yang valid',
    feedback: 'Input dengan type="email" akan divalidasi otomatis oleh browser untuk memeriksa format email, termasuk keberadaan simbol "@" dan domain yang sesuai.'
  },
  {
    id: 4,
    question: "Cara untuk memastikan input tidak kosong menggunakan HTML dengan …. ",
    options: [
      "Menambahkan atribut required pada input",
      "Menggunakan JavaScript untuk mengecek panjang string",
      "Memanggil event onsubmit pada form",
      "Menambahkan event click pada input",
      'Menggunakan atribut maxlength="0"'
    ],
    correctAnswer: "Menambahkan atribut required pada input",
    feedback: 'Atribut required pada elemen <input> membuat field tersebut wajib diisi sebelum form bisa disubmit.'
  },
  {
    id: 5,
    question: "Cara yang benar untuk menampilkan pesan error jika input nama kosong menggunakan JavaScript adalah …. ",
    options: [
      'if(nama === "") alert("Nama harus diisi!");',
      'if(nama == null) console.log("Nama wajib diisi");',
      'document.write("Nama harus diisi!");',
      'window.prompt("Nama harus diisi!");',
      'confirm("Nama harus diisi!")'
    ],
    correctAnswer: 'if(nama === "") alert("Nama harus diisi!");',
    feedback: 'Kondisi if(nama === "") memeriksa apakah input kosong, dan alert() menampilkan pesan peringatan kepada pengguna secara langsung.'
  },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect =
      answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isAnswerCorrect);
  };

  const handleNext = async () => {
    if (!isCorrect) {
      alert("Jawaban belum benar. Silakan coba lagi.");
      return;
    }

    if (isLastQuestion) {
      if (!hasSeenFinalFeedback) {
        setHasSeenFinalFeedback(true);
        return; // Jangan lanjut sampai user klik lagi
      }

      try {
        if (halamanAktif >= progress) {
          await updateProgress(halamanAktif);
        }

        Swal.fire({
          icon: "success",
          title: "Selamat!",
          text: "Kamu telah menyelesaikan materi ini.",
          confirmButtonText: "OK",
        });
      } catch (err) {
        alert("Terjadi kesalahan saat memperbarui progress.");
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer("");
      setIsCorrect(null);
      setHasSeenFinalFeedback(false);
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setSelectedAnswer("");
        setIsCorrect(null);
        setHasSeenFinalFeedback(false);
    }
    };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        {!showModal && (
            <div className="sidebar">
                <SidebarMahasiswa />
            </div>
        )}
        <div className="main-content">
        <AktivitasBox aktivitas={<TujuanPembelajaran tujuan={tujuanBelajar} />} />
        <AktivitasBox aktivitas={<Materi description={materiContent} />} />

        {/* Aktivitas Latihan Soal */}
        <AktivitasBox aktivitas={
          <>
            <GambarAktivitas
              src="/aktivitas.png" 
              alt="Aktivitas" 
            />
            <div className="mt-2 mx-5">
              <div
                className="question-box border p-3 rounded"
                style={{
                  border: "2px solid #007bff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p>Silahkan kerjakan soal di bawah ini dengan memilih salah satu jawaban yang benar untuk menguji kemampuan kamu pada materi ini</p>
                <div
                  className="mb-3 px-3 py-2 text-white"
                  style={{
                    backgroundColor: "#1F4E79",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Soal {currentQuestionIndex + 1} dari {questions.length}
                </div>
                <p>
                  {currentQuestion.question}
                </p>
                 {currentQuestion.image && (
                  <img
                    src={currentQuestion.image}
                    alt="Soal Gambar"
                    className="img-fluid my-3"
                    style={{ maxWidth: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                )}
                {currentQuestion.options.map((option, index) => (
                  <div className="form-check mb-2" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      id={`option-${currentQuestion.id}-${index}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswer(option)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option-${currentQuestion.id}-${index}`}
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        borderRadius: "4px",
                        display: "block",
                      }}
                    >
                      {option}
                    </label>
                  </div>
                ))}
                {isCorrect !== null && (
                  <div
                    className={`mt-3 p-3 rounded d-flex align-items-start gap-2 ${
                      isCorrect ? "alert alert-success" : "alert alert-danger"
                    }`}
                  >
                    <div>
                      {isCorrect ? (
                        <FaCheckCircle size={20} className="text-success" />
                      ) : (
                        <FaTimesCircle size={20} className="text-danger" />
                      )}
                    </div>
                    <div>
                       <p className="fw-bold mb-1">
                          {isCorrect ? "Jawaban benar!" : "Jawaban salah, silakan coba lagi."}
                        </p>
                        {isCorrect && (
                          <p className="mb-0 mt-2">{currentQuestion.feedback}</p>
                        )}  
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between mt-4">
                  {currentQuestionIndex > 0 && (
                    <button
                      className="btn btn-secondary"
                      onClick={handlePrevious}
                    >
                      Kembali
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!isCorrect}
                  >
                    {isLastQuestion
                      ? hasSeenFinalFeedback
                        ? "Selesai"
                        : "Lanjut"
                      : "Lanjut"}
                  </button>
                </div>
              </div>
            </div>
          </>
        } />

        <ModalPetunjukKuis
          show={showModal}
          onClose={() => setShowModal(false)}
          bab="Form DOM"
          kuis={5}
          routeMulai="/kuis6"
        />

        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/mengaksesForm-elemenForm")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={handleNextClick}
            className="btn btn-warning text-white"
            disabled={progress <= halamanAktif}
          >
            Selanjutnya
          </button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default MateriValidasiForm;
