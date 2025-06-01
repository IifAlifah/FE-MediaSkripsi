import { useState, useEffect} from "react"; 
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar_profile";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import KodeEditor from "../../components/kodeEditor.jsx";
import Tabel from "../../components/tabel.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MateriFormDom = () => {
  const [progress, setProgress] = useState(0);
  const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(20); // halaman saat ini
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
      <li>Memahami form di DOM dan menerapkannya dalam pengambilan nilai input menggunakan JavaScript.</li>
    </ul>
    </>
  );

    const columnInput = ['Jenis Input', 'Cara Akses Nilai dengan JS', 'Keterangan'];
    const dataInput = [
    ['<input type="text">', 'element.value', 'Mengambil teks yang diketik oleh user'],
    ['<input type="checkbox">', 'element.checked', 'Mengambil status dicentang atau tidak'],
    ['<input type="radio">', "document.querySelector(\"input[name='x']:checked\").value", 'Mengambil nilai dari radio button yang dipilih'],
    ['<select>', 'element.value', 'Mengambil nilai dari opsi yang dipilih'],
    ['<select multiple>', 'Array.from(element.selectedOptions).map(opt => opt.value)', 'Mengambil semua nilai dari opsi yang dipilih dalam bentuk array'],
    ['<textarea>', 'element.value', 'Mengambil isi teks dari kolom teks banyak baris'],
    ];

  const materiContent = 
  <>
    <Header title="Mengakses Form dan Elemen Form" />
    <p>
    <strong>Form</strong> adalah wadah yang berisi berbagai elemen input, seperti teks, tombol, checkbox, dan sebagainya. 
    Dalam sebuah dokumen HTML, kita dapat memiliki lebih dari satu formulir dengan berbagai elemen input. Mengakses form berarti mendapatkan referensi ke elemen <code>&lt;form&gt;</code> itu sendiri dalam dokumen HTML. 
    Sedangkan mengakses elemen form berarti mengambil elemen yang berada di dalam form tersebut, seperti <code>input</code>, <code>textarea</code>, <code>select</code>, dan <code>button</code>. Oleh karena itu, JavaScript menyediakan berbagai cara untuk mengakses formulir dan elemen di dalamnya secara tepat. 
    Dengan mengetahui cara ini, kita dapat dengan mudah mengelola data yang dimasukkan oleh pengguna.
    </p>

  </>

  const materiContent1 =
    <>
    1. <strong>Menggunakan <code>document.forms</code></strong>

    <p>
    Properti <code>document.forms</code> mengembalikan koleksi semua elemen <code>&lt;form&gt;</code> dalam dokumen HTML. 
    Kita dapat mengakses formulir:
    </p>

    <ul>
    <li>Berdasarkan <strong>indeks</strong> (urutan kemunculannya di dokumen)</li>
    </ul>

    <p>Perhatikan contoh kode di bawah ini!</p>
    <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <form>
        <input type="text" name="username">
    </form>
    <h3>Output:</h3>
    <div id="output"></div>
    <script>
        var form = document.forms[0]; 
        document.getElementById("output").innerHTML = form; 
    </script>
</body>
</html>`}
        runnable={true}
        editorId="editor1" 
        />
        <br></br>
        <p>
        Kode <code>document.forms[0]</code> digunakan untuk mengakses form pertama yang muncul di halaman, 
        terlepas dari apakah form tersebut memiliki atribut <code>name</code> atau tidak.
        </p>

        <ul>
        <li>Berdasarkan <strong>atribut name</strong> yang ditetapkan di tag <code>&lt;form&gt;</code> </li>
        </ul>

        <p>Perhatikan contoh kode di bawah ini!</p>
    <KodeEditor
        key="editor2"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <form name="formLogin">
        <input type="text" name="username">
    </form>
    <h3>Output:</h3>
    <div id="output"></div>

    <script>
        var form = document.forms["formLogin"]; 
        document.getElementById("output").innerHTML = form; 
    </script>
</body>
</html>`}
        runnable={true}
        editorId="editor2" 
        />
        <br></br>
        <p>
        Kode <code>document.forms["formLogin"]</code> digunakan untuk mengakses form yang memiliki atribut <code>name="formLogin"</code>.  
        Cara ini sangat berguna ketika kita memiliki banyak form serupa dan ingin mengakses form tertentu dengan mudah berdasarkan nama.
        </p>
    </>

    const materiContent2 =
    <>  
    2. <strong>Mengakses Elemen dalam Form</strong>
    <p>
    Setiap formulir memiliki berbagai elemen input yang bisa diakses menggunakan beberapa metode. Elemen-elemen ini termasuk input teks, tombol radio, checkbox, dan select.  
    Pada materi sebelumnya, kita telah mengenal beberapa cara mengakses elemen HTML, seperti <code>getElementById()</code>, <code>getElementsByClassName()</code>, <code>getElementsByTagName()</code>, <code>querySelector("selector")</code>, dan <code>querySelectorAll("selector")</code>.
    </p>

    <p>Sekarang, kita menggunakan cara-cara tersebut untuk mengambil nilai dari berbagai elemen form yang umum digunakan. Berikut adalah beberapa jenis elemen form dan cara mengakses nilainya:</p>
    <p className="text-center"> Tabel Cara Mengambil Nilai Elemen Form dengan JavaScript</p>
    <Tabel columns={columnInput} data={dataInput} />

    <p>Perhatikan kode di bawah ini!</p>
     <KodeEditor
  key="editor3"
  code={`<!DOCTYPE html>
<html lang="en">
<body>
  <form id="formku">
    <input type="text" id="nama" placeholder="Nama"><br>
    <input type="checkbox" id="setuju"> Setuju<br>
    <select id="kota">
      <option value="bdg">Bandung</option>
      <option value="jkt">Jakarta</option>
    </select><br>
    <textarea name="pesan" placeholder="Pesan kamu"></textarea><br>
    <button type="button" onclick="ambilData()">Kirim</button>
  </form>

  <div id="hasil" style="margin-top: 20px; font-size: 18px; white-space: pre-line;"></div>

  <script>
    function ambilData() {
      const nama = document.getElementById("nama").value;
      const setuju = document.querySelector("#setuju").checked;
      const kota = document.getElementsByTagName("select")[0].value;
      const pesan = document.querySelector("textarea[name='pesan']").value;

      document.getElementById("hasil").innerText =
        nama + "\\n" +
        (setuju ? "Setuju" : "Tidak Setuju") + "\\n" +
        kota + "\\n" +
        pesan;
    }
  </script>
</body>
</html>`}
  runnable={true}
  editorId="editor3"
/>

        <br></br>
        <p>
        Contoh kode di atas menunjukkan cara mengambil nilai dari elemen form menggunakan berbagai metode akses DOM, seperti <code>getElementById</code>, <code>querySelector</code>, dan <code>getElementsByTagName</code>.  
        Hasil input akan langsung ditampilkan di halaman setelah tombol diklik.
        </p>

    </>
    const questions = [
    {
        id: 1,
        question: "Perhatikan potongan kode berikut. Kode dibawah tidak akan berfungsi sebagaimana mestinya karena ....",
        image: "/Aktivitas/aktivitas4_no1.png",
        options: [
        "Form harus memiliki atribut id, bukan name",
        "Input tidak bisa diakses dari forms jika tidak punya atribut name",
        "document.forms tidak bisa digunakan di dalam fungsi",
        "getElementById lebih tepat daripada document.forms",
        "Input harus berada di dalam tag <label>"
        ],
        correctAnswer: "Input tidak bisa diakses dari forms jika tidak punya atribut name",
        feedback: "Agar dapat diakses menggunakan document.forms[\"formContact\"][\"nama\"], input harus memiliki atribut name, bukan hanya id."
    },
    {
        id: 2,
        question: "Cara mengambil nilai dari input dengan id=\"email\" dengan …. ",
        options: [
        "document.querySelector(\"#email\").textContent;",
        "document.getElementById(\"email\").value;",
        "document.getElementsByTagName(\"email\").text;",
        "document.getElementById(\"email\").innerHTML;",
        "document.forms[\"email\"].value;"
        ],
        correctAnswer: "document.getElementById(\"email\").value;",
        feedback: "Untuk mengambil nilai dari input, kita gunakan .value, dan getElementById(\"email\")` adalah cara yang tepat untuk mengakses elemen dengan id tersebut."
    },
    {
        id: 3,
        question: "Perintah yang digunakan untuk mendapatkan semua elemen <input> dalam dokumen adalah …. ",
        options: [
        "document.querySelectorAll(\"input\")",
        "document.forms[\"form1\"].inputs;",
        "document.getElementsById(\"input\");",
        "document.querySelector(\"input\")",
        "document.getElementsByName(\"input\")"
        ],
        correctAnswer: "document.querySelectorAll(\"input\")",
        feedback: "document.querySelectorAll(\"input\") akan mengembalikan NodeList berisi semua elemen <input> dalam dokumen."
    },
    {
        id: 4,
        question: "Fungsi dari document.querySelector(\"input\") adalah …. ",
        options: [
        "Mengambil semua elemen <input> dalam dokumen",
        "Mengambil elemen <input> pertama dalam dokumen",
        "Mengembalikan semua elemen form dalam dokumen",
        "Menghapus elemen <input> pertama dalam dokumen",
        "Mengubah nilai elemen <input> pertama"
        ],
        correctAnswer: "Mengambil elemen <input> pertama dalam dokumen",
        feedback: "document.querySelector(\"input\") akan mengambil elemen <input> pertama yang ditemukan dalam dokumen yang cocok dengan selector tersebut."
    },
    {
        id: 5,
        question: "Kode yang paling aman untuk mengambil nilai dari radio button yang dipilih dengan name=\"status\" adalah ....",
        options: [
        "document.getElementById(\"status\").value;",
        "document.querySelector(\"input[name=\"status\"]\").value;",
        "document.getElementsByName(\"status\")[0].value;",
        "document.querySelector(\"input[name=\"status\"]:checked\").value;",
        "document.forms[\"form1\"].status.value;"
        ],
        correctAnswer: "document.querySelector(\"input[name=\"status\"]:checked\").value;",
        feedback: "Gunakan selector :checked untuk mendapatkan radio button yang dipilih, lalu ambil nilainya."
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
        <div className="sidebar">
          <SidebarMahasiswa />
        </div>
        <div className="main-content">
        <AktivitasBox aktivitas={
          <>
            <TujuanPembelajaran tujuan={tujuanBelajar} />
          </>
        }
        />
        <AktivitasBox aktivitas={<Materi description={materiContent} />} />
        <AktivitasBox aktivitas={<Materi description={materiContent1} />} />
        <AktivitasBox aktivitas={<Materi description={materiContent2} />} />

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

        <div className="d-flex justify-content-end ms-4 me-4 mt-5">
          <button
            onClick={() => navigate("/materi/validasiForm")}
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

export default MateriFormDom;
