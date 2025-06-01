import { useState, useEffect} from "react"; 
import { useNavigate } from 'react-router-dom';
import SidebarMahasiswa from "../../components/sidebarMahasiswa";
import Navbar from "../../components/Navbar_profile";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import Swal from "sweetalert2";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MateriDOM = () => {
  const [progress, setProgress] = useState(0);
  const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(3); // halaman saat ini
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

  const tujuanBelajar = (
    <>
    <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
    <ul>
      <li>Memahami apa itu DOM</li>
      <li>Memahami struktur DOM Tree dalam dokumen HTML</li>
      <li>Mengenali berbagai jenis Nodes dalam DOM</li>
    </ul>
    </>
  );

  const materiIntro = (
    <>
      <p>
        Sebelum kita mempelajari lebih lanjut tentang <strong>DOM</strong>, mari kita ingat kembali sedikit materi sebelumnya. 
        Pada pertemuan sebelumnya, kita telah mengenal apa itu <strong>object</strong>. 
        Pemahaman tentang object akan sangat membantu ketika kita mempelajari <strong>Document Object Model (DOM)</strong>, 
        karena DOM juga merupakan representasi dari dokumen web dalam bentuk object, di mana setiap elemen di dalam halaman memiliki sifat dan dapat melakukan aksi tertentu.
      </p>

    </>
  );

  const materiContent = 
  <>
    <Header title="Apa itu DOM" />
    <p>
      DOM adalah struktur yang merepresentasikan seluruh elemen dalam sebuah halaman web sebagai objek yang bisa diakses dan dimanipulasi menggunakan JavaScript. 
      Dengan kata lain, setiap elemen HTML seperti paragraf, tombol, gambar, dan tautan dianggap sebagai objek yang memiliki properti dan metode yang bisa kita ubah sesuai kebutuhan. 
      Setiap elemen HTML yang ditulis di dalam dokumen web diorganisasikan dalam bentuk struktur pohon yang disebut DOM Tree. Elemen-elemen ini disebut sebagai node.
    </p>
    <p>
      DOM berperan penting dalam pengembangan web dinamis, di mana halaman web dapat diubah secara langsung oleh skrip JavaScript tanpa memuat ulang halaman tersebut. 
      Misalnya, DOM memungkinkan perubahan pada konten teks, penambahan elemen baru, atau modifikasi atribut elemen HTML (seperti warna atau ukuran) secara dinamis, tergantung pada interaksi pengguna.
    </p>
    <p><strong>Klik tombol di bawah untuk melihat bagaimana perubahan elemen terjadi melalui DOM.</strong></p>
    
    <div className="container">
  <div className="row row-cols-1 row-cols-md-2 g-4">

    {/* Contoh 1: Ubah Teks dan Warna */}
    <div className="col">
      <div
        className="card h-100 border-light"
        style={{
          backgroundColor: '#AFDDFF',
          color: 'white',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', // menambahkan shadow
          borderRadius: '10px', // sudut lebih melengkung
        }}
      >
        <div className="card-body text-center">
          <p id="textContoh1">Ini adalah teks awal</p>
          <button
            className="btn btn-light"
            onClick={() => {
              const el = document.getElementById("textContoh1");
              el.textContent = "Teks telah diubah!";
              el.style.color = "red";
            }}
            style={{
              backgroundColor: '#ffffff',
              color: '#007bff',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Klik untuk Ubah
          </button>
        </div>
      </div>
    </div>

    {/* Contoh 2: Sembunyikan/Tampilkan */}
    <div className="col">
      <div
        className="card h-100 border-light"
        style={{
          backgroundColor: '#80c7ff',
          color: 'white',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', // menambahkan shadow
          borderRadius: '10px', // sudut lebih melengkung
        }}
      >
        <div className="card-body text-center">
          <div
            id="boxContoh2"
            className="p-3 bg-light border mb-2"
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '5px', 
              color: 'black'// sudut melengkung pada box
            }}
          >
            Ini adalah kotak yang bisa disembunyikan.
          </div>
          <button
            className="btn btn-light"
            onClick={() => {
              const box = document.getElementById("boxContoh2");
              box.style.display = box.style.display === "none" ? "block" : "none";
            }}
            style={{
              backgroundColor: '#ffffff',
              color: '#6c757d',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Sembunyikan / Tampilkan
          </button>
        </div>
      </div>
    </div>

  </div>
  </div>

    <br></br>
    <p>
      Dengan menggunakan DOM (Document Object Model), kita dapat melakukan berbagai hal pada halaman web secara dinamis melalui JavaScript, antara lain:
      <ul>
        <li>Mengakses Elemen</li>
        <li>Memanipulasi Konten</li>
        <li>Mengubah Atribut</li>
        <li>Menambah atau Menghapus Elemen</li>
        <li>Menangani Event</li>
      </ul>
    </p>
  </>

const questions = [
  {
    id: 1,
    question: "DOM merupakan singkatan dari …. ",
    options: [
      "Document Object Management",
      "Document Object Model",
      "Data Object Model",
      "Data Object Management",
      "Document Organizing Model",
    ],
    correctAnswer: "Document Object Model",
    feedback: "DOM adalah singkatan dari Document Object Model, yaitu representasi struktur halaman web dalam bentuk objek sehingga dapat dimanipulasi menggunakan JavaScript."
  },
  {
    id: 2,
    question: "Yang dimaksud dengan DOM adalah …. ",
    options: [
      "Struktur yang menyimpan data dalam database",
      "Struktur yang merepresentasikan elemen halaman web sebagai objek",
      "Sebuah elemen HTML",
      "Sebuah jenis elemen CSS",
      "Sebuah framework JavaScript",
    ],
    correctAnswer: "Struktur yang merepresentasikan elemen halaman web sebagai objek",
    feedback: "DOM adalah struktur data berbentuk pohon (tree) yang menggambarkan elemen HTML pada halaman web sebagai objek, sehingga dapat diakses dan dimanipulasi menggunakan JavaScript."
  },
  {
    id: 3,
    question: "Ketika JavaScript menambahkan elemen baru ke halaman web menggunakan DOM, maka elemen tersebut …. ",
    options: [
      "Akan ditampilkan di halaman setelah halaman dimuat ulang",
      "Ditambahkan secara dinamis tanpa perlu memuat ulang halaman",
      "Tidak akan terlihat sampai JavaScript dinonaktifkan",
      "Akan menimpa semua elemen yang ada",
      "Akan disimpan di server terlebih dahulu",
    ],
    correctAnswer: "Ditambahkan secara dinamis tanpa perlu memuat ulang halaman",
    feedback: "Manipulasi DOM memungkinkan perubahan halaman terjadi secara langsung (real-time) di browser tanpa harus melakukan reload halaman."
  },
  {
    id: 4,
    question: "Contoh penggunaan DOM adalah …. ",
    options: [
      "Menyimpan data ke dalam MySQL",
      "Mengubah warna tombol saat diklik",
      "Mengatur router jaringan",
      "Menghapus file local",
      "Mengubah BIOS",
    ],
    correctAnswer: "Mengubah warna tombol saat diklik",
    feedback: "Dengan DOM, kita dapat membuat interaksi seperti mengubah warna tombol saat diklik menggunakan JavaScript untuk mengakses dan memodifikasi elemen HTML."
  },
  {
    id: 5,
    question: "Manakah pernyataan berikut yang paling tepat tentang DOM …. ",
    options: [
      "DOM digunakan untuk menyimpan data pengguna di server.",
      "DOM memuat ulang seluruh halaman web setiap kali ada perubahan",
      "DOM memungkinkan JavaScript mengakses dan memanipulasi elemen HTML tanpa perlu memuat ulang halaman",
      "DOM digunakan untuk menggantikan HTML dalam menyusun halaman web",
      "DOM hanya dapat digunakan untuk membaca elemen HTML, tidak bisa mengubahnya.",
    ],
    correctAnswer: "DOM memungkinkan JavaScript mengakses dan memanipulasi elemen HTML tanpa perlu memuat ulang halaman.",
    feedback: "Betul! DOM berfungsi sebagai jembatan antara JavaScript dan elemen HTML, sehingga kita dapat mengubah isi, atribut, maupun struktur elemen di halaman web secara dinamis tanpa perlu reload."
  }
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
        if (halamanAktif > progress) {
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
        <div className="sidebar">
          <SidebarMahasiswa />
        </div>
        <div className="main-content">
        <AktivitasBox aktivitas={
          <>
            <TujuanPembelajaran tujuan={tujuanBelajar} />
            <Materi description={materiIntro} />
          </>
        }
        />
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

        <div className="d-flex justify-content-end ms-4 me-4 mt-5">
          <button
            onClick={() => navigate("/materi/domTree")}
            className="btn btn-warning text-white"
            disabled={progress < halamanAktif}
          >
            Selanjutnya
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MateriDOM;
