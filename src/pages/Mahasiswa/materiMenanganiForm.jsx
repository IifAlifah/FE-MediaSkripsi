import { useState, useEffect} from "react"; 
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import KodeEditor from "../../components/kodeEditor.jsx";
import Tabel from "../../components/tabel.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";

const MateriMenanganiEventForm = () => {
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(25); // halaman saat ini
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

    const columnEvent = ['Event', 'Deskripsi'];
    const dataEvent = [
    ['submit', 'Terpicu saat form dikirim'],
    ['reset', 'Terpicu saat form direset'],
    ['change', 'Terpicu saat nilai input berubah'],
    ['input', 'Terpicu saat pengguna mengetik'],
    ['focus', 'Terpicu saat input mendapat fokus'],
    ['blur', 'Terpicu saat input kehilangan fokus'],
    ['keydown / keyup', 'Terpicu saat tombol ditekan atau dilepas'],
    ];

  const materiContent = 
  <>
    <Header title="Menangani Event dalam Form" />
    <p>
    Dalam JavaScript, event pada form digunakan untuk menangani berbagai interaksi pengguna seperti mengetik, mengirim, atau mengubah nilai dalam input form. Event ini membantu meningkatkan responsivitas dan validasi sebelum data dikirim.
    </p>

    <p>Berikut beberapa jenis event pada form:</p>
    <Tabel columns={columnEvent} data={dataEvent} />

    <p>Perhatikan kode di bawah ini!</p>
<KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <form id="resetForm">
        <input type="text" placeholder="Isi sesuatu...">
        <button type="reset">Reset</button>
    </form>
    
    <script>
    document.getElementById("resetForm").addEventListener("reset", function(event) {
        let konfirmasi = confirm("Apakah Anda yakin ingin mereset formulir?");
        if (!konfirmasi) {
            event.preventDefault(); 
        }
    });
    </script>
</body>
</html>`}
        runnable={true}
        editorId="editor1" 
        />
        <br></br>
        <p>
        Kode ini menggunakan event <code>reset</code> pada elemen <code>form</code> untuk menampilkan konfirmasi sebelum formulir direset. 
        Event <code>reset</code> akan dipicu saat tombol reset ditekan, dan JavaScript akan menangkap event ini menggunakan <code>addEventListener()</code>.
        </p>

        <p>
        Ketika event terjadi, sebuah dialog konfirmasi (<code>confirm()</code>) akan muncul dengan pertanyaan apakah pengguna yakin ingin mereset formulir. 
        Jika pengguna memilih <strong>OK</strong>, proses reset akan dilanjutkan, dan form akan dikosongkan seperti biasa.
        </p>

        <p>
        Namun, jika pengguna memilih <strong>Cancel</strong>, maka <code>event.preventDefault()</code> akan dijalankan untuk menghentikan aksi reset, sehingga data dalam form tetap terjaga.
        </p>

        <p>
        Penggunaan event ini bermanfaat untuk mencegah penghapusan data secara tidak sengaja dan memberikan kontrol tambahan kepada pengguna sebelum formulir benar-benar dikosongkan.
        </p>
  </>


const questions = [
  {
    id: 1,
    question: "Event yang terjadi saat pengguna mengklik tombol submit dalam form adalah ….",
    options: [
      "Click",
      "Submit",
      "Change",
      "Focus",
      "Keydown"
    ],
    correctAnswer: "Submit",
  },
  {
    id: 2,
    question: "Perintah mana yang digunakan untuk mencegah form dikirim ketika pengguna menekan tombol submit adalah ….",
    options: [
      "event.stopPropagation();",
      "return false;",
      "event.preventDefault();",
      "event.stop();",
      "event.cancel();"
    ],
    correctAnswer: "event.preventDefault();",
  },
  {
    id: 3,
    question: "Fungsi event focus dalam elemen form yaitu ….",
    options: [
      "Memicu aksi ketika input kehilangan fokus.",
      "Memicu aksi saat input mendapatkan fokus.",
      "Mengubah nilai input ketika tombol ditekan.",
      "Mengirim form secara otomatis.",
      "Menutup form secara paksa"
    ],
    correctAnswer: "Memicu aksi saat input mendapatkan fokus.",
  },
  {
    id: 4,
    question: "Event change akan dipicu ketika ….",
    options: [
      "Pengguna mengklik tombol submit.",
      "Nilai input berubah dan kehilangan fokus.",
      "Tombol keyboard ditekan.",
      "Form berhasil dikirim.",
      "Halaman dimuat ulang"
    ],
    correctAnswer: "Nilai input berubah dan kehilangan fokus.",
  },
  {
    id: 5,
    question: "Yang akan terjadi jika event.preventDefault() digunakan pada event reset dalam form ….",
    options: [
      "Form akan tetap direset seperti biasa.",
      "Form tidak akan direset.",
      "Form akan langsung terkirim.",
      "Form akan menampilkan error.",
      "Form akan dikosongkan secara otomatis"
    ],
    correctAnswer: "Form tidak akan direset.",
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
  if (isCorrect) {
    if (isLastQuestion) {
      try {
        if (halamanAktif > progress) {
          await updateProgress(halamanAktif); // ✅ hanya update jika lebih besar
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
      setSelectedAnswer("");
      setIsCorrect(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  } else {
    alert("Jawaban belum benar. Silakan coba lagi.");
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
                <p>Silahkan kerjakan soal di bawah ini untuk menguji kemampuan kamu</p>
                <p>
                  <strong>SOAL {currentQuestion.id}:</strong> {currentQuestion.question}
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
                  <div className="mt-2">
                    {isCorrect ? (
                      <p className="text-success fw-bold">
                        Jawaban benar!
                      </p>
                    ) : (
                      <p className="text-danger fw-bold">
                        Jawaban salah, silakan coba lagi.
                      </p>
                    )}
                  </div>
                )}
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleNext}
                  disabled={!isCorrect}
                >
                  {isLastQuestion ? "Selesai" : "Lanjut"}
                </button>
              </div>
            </div>
          </>
        } />

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
            onClick={() => navigate("/materi/validasiForm")}
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

export default MateriMenanganiEventForm;
