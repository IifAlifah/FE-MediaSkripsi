import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import ModalPetunjukKuis from "../../components/modalPetunjukKuisPilgan";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import KodeEditor from "../../components/kodeEditor";
import GambarAktivitas from "../../components/gambarAktivitas";
import Tabel from "../../components/tabel.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MetodePropertiDOM = () => {
  const [showModal, setShowModal] = useState(false); 
  const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(6); // halaman saat ini
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

  const columns = ['Metode', 'Penjelasan'];
  const data = [
    ['getElementById()', 'Mengambil elemen berdasarkan ID.'],
    ['getElementsByClassName()', 'Mengambil semua elemen dengan class tertentu.'],
    ['getElementsByTagName()', 'Mengambil semua elemen dengan tag tertentu (misal <p>).'],
    ['querySelector()', 'Mengambil elemen pertama yang cocok dengan CSS selector.'],
    ['querySelectorAll()', 'Mengambil semua elemen yang cocok dengan CSS selector.'],
    ['addEventListener()', 'Menambahkan event handler ke dalam elemen HTML.'],
    ['appendChild()', 'Menambahkan elemen baru ke dalam elemen lain.'],
    ['setAttribute()', 'Mengatur atau mengubah atribut elemen.'],
    ['removeAttribute()', 'Menghapus atribut elemen.'],
  ];
  
  const columnProperti = ['Properti', 'Penjelasan'];
  const dataProperti = [
    ['innerHTML', 'Mengubah atau mengambil HTML di dalam elemen.'],
    ['innerText', 'Mengubah atau mengambil teks dalam elemen.'],
    ['color', 'Mengatur warna teks.'],
    ['className', 'Mengatur atau mengambil nilai atribut class elemen.'],
    ['fontSize', 'Mengatur ukuran teks.'],
    ['title', 'Mengambil atau menetapkan judul elemen.'],
    ['textContent', 'Mengatur atau mendapatkan teks yang terdapat dalam elemen.'],
  ];
  const materiContent = (
    <>
      <Header title="Metode dan Properti DOM" />
      <p>
        Dalam DOM (Document Object Model), setiap elemen dalam halaman web direpresentasikan sebagai objek yang dapat diakses dan dimanipulasi menggunakan JavaScript.
        Untuk melakukan interaksi ini, kita menggunakan metode dan properti DOM.
      </p>

      <ul>
        <li><strong>Metode DOM:</strong> Fungsi yang digunakan untuk mencari, menambahkan, mengubah, atau menghapus elemen HTML.</li>
        <li><strong>Properti DOM:</strong> Nilai dari elemen HTML yang dapat dibaca atau diubah, seperti teks dalam elemen atau atribut elemen.</li>
      </ul>
      
      <p>Perhatikan code di bawah ini</p>
      <KodeEditor
         code={
`<html lang="en">
<body>
    <p id="paragraf">Ini adalah teks awal.</p>

    <script>
        let paragraf = document.getElementById("paragraf"); 
        paragraf.innerText = "Teks ini telah diubah."; 
    </script>
</body>
</html>`}
         runnable={true}
        />
    <br></br>
    <p>Pada kode diatas:</p>
    <ul>
        <li><code>getElementById("paragraf")</code>: Mengambil elemen dengan <code>id</code> bernama <code>"paragraf"</code>. Metode ini mengembalikan referensi ke elemen HTML yang sesuai, sehingga dapat dimanipulasi menggunakan JavaScript.</li>
        <li><code>innerText</code>: Mengubah teks di dalam elemen <code>&lt;p&gt;</code> yang telah diambil. Properti ini akan menggantikan teks lama dengan teks baru tanpa mempengaruhi struktur HTML lainnya dalam elemen tersebut.</li>
    </ul>

    <p>Metode dan properti ini memungkinkan interaksi langsung dengan elemen HTML dalam halaman, sehingga dapat digunakan untuk berbagai keperluan seperti mengubah tampilan, menambah elemen baru, atau merespons interaksi pengguna.</p>
      <p>Berikut ini beberapa metode dan properti dalam DOM:</p>
      
      <h5>Metode DOM</h5>
      <Tabel columns = {columns} data = {data} />

      <h5>Properti DOM</h5>
      <Tabel columns = {columnProperti} data = {dataProperti} />

    </>
  );
  const questions = [
    {
      id: 1,
      question: "Properti DOM yang digunakan untuk mengubah isi teks dalam suatu elemen HTML tanpa mempengaruhi struktur HTML di dalamnya adalah …. ",
      options: [
        "innerHTML",
        "innerText",
        "setAttribute",
        "appendChild",
        "getElementsByTagName",
      ],
      correctAnswer: "innerText",
      feedback: "innerText hanya mengubah teks di dalam elemen, tanpa mempengaruhi struktur HTML di dalamnya."
    },
    {
      id: 2,
      question: "Jika kita ingin menghapus atribut elemen dalam DOM, metode yang harus digunakan …. ",
      options: [
        "setAttribute()",
        "removeAttribute()",
        "querySelectorAll()",
        "appendChild()",
        "getElementsByTagName()",
      ],
      correctAnswer: "removeAttribute()",
      feedback: "removeAttribute() digunakan untuk menghapus atribut dari sebuah elemen HTML."
    },
    {
      id: 3,
      question: "Perbedaan utama antara innerHTML dan textContent dalam DOM adalah …. ",
      options: [
        "innerHTML mengembalikan hanya teks dalam elemen, sementara textContent mengembalikan teks beserta elemen HTML yang ada.",
        "textContent mengembalikan teks tanpa elemen HTML, sementara innerHTML mengembalikan teks beserta elemen HTML.",
        "innerHTML hanya digunakan untuk elemen <p>, sedangkan textContent dapat digunakan untuk semua elemen.",
        "innerHTML lebih cepat daripada textContent dalam mengambil teks dari elemen.",
        "Tidak ada perbedaan, keduanya memberikan output yang sama.",
      ],
      correctAnswer: "textContent mengembalikan teks tanpa elemen HTML, sementara innerHTML mengembalikan teks beserta elemen HTML.",
      feedback: "textContent hanya mengambil teks murni, sedangkan innerHTML menyertakan markup HTML di dalamnya."
    },
    {
      id: 4,
      question: "Metode DOM yang digunakan untuk mengambil elemen pertama yang cocok dengan selector CSS tertentu adalah …. ",
      options: [
        "querySelectorAll()",
        "getElementsByTagName()",
        "getElementsByClassName()",
        "querySelector()",
        "getElementsByName()",
      ],
      correctAnswer: "querySelector()",
      feedback: "querySelector() mengambil elemen pertama yang cocok dengan selector CSS yang diberikan."
    },
    {
      id: 5,
      question: "Yang terjadi jika kita menggunakan metode appendChild() pada elemen induk dalam DOM adalah …. ",
      options: [
        "Menambahkan elemen baru ke dalam elemen induk.",
        "Menghapus elemen induk dari dokumen HTML.",
        "Menghapus semua elemen anak dari elemen induk.",
        "Mengganti elemen anak pertama dari elemen induk.",
        "Mengubah teks elemen induk menjadi elemen baru.",
      ],
      correctAnswer: "Menambahkan elemen baru ke dalam elemen induk.",
      feedback: "appendChild() digunakan untuk menambahkan node anak baru ke elemen induk di DOM."
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
        {!showModal && (
          <div className="sidebar">
            <SidebarMahasiswa />
          </div>
        )}

        <div className="main-content">
          <AktivitasBox aktivitas={<Materi description={materiContent} />} />
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

         <ModalPetunjukKuis
          show={showModal}
          onClose={() => setShowModal(false)}
          bab="Pengenalan DOM"
          kuis={2}
          routeMulai="/kuis2"
        />

        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/node")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={handleNextClick}
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

export default MetodePropertiDOM;
