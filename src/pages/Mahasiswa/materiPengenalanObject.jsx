import { useState, useEffect } from "react"; 
import SidebarMahasiswa from "../../components/sidebarMahasiswa";
import Navbar from "../../components/Navbar_profile";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Materi from "../../components/Materi";
import Header from "../../components/header";
import AktivitasBox from "../../components/box";
import GambarAktivitas from "../../components/gambarAktivitas";
import KodeEditor from "../../components/kodeEditor";
import Swal from "sweetalert2";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MateriPengenalanObject = () => {
  const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(0); // halaman saat ini
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
      console.log("Progress lokal diperbarui ke:", newProgress);
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
      <p>Setelah mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
      <ul>
          <li>Memahami apa itu DOM HTML</li>
      </ul>
    </>
  );

  // const materiIntro = (
  //   <>
  //     <p>
  //       Sebelum kita belajar bagaimana JavaScript bisa mengubah tampilan dan perilaku halaman web, 
  //       penting untuk memahami konsep dasar yang sangat penting dalam pemrograman, yaitu object (objek). 
  //       Objek akan menjadi fondasi yang sangat berguna ketika kita mulai memanipulasi elemen-elemen HTML 
  //       menggunakan DOM (Document Object Model).
  //     </p>
  //   </>
  // );

  const materiContent = (
    <>
    <Header title="Mengenal DOM" />

    <p>Saat sebuah halaman HTML dimuat ke dalam web browser, halaman tersebut akan diubah menjadi sebuah objek yang disebut <b><i>document object</i></b>. Objek ini digunakan oleh JavaScript untuk mengenali dan mengelola semua bagian dari halaman, seperti teks, gambar, tombol, dan elemen lainnya.</p>
  
    <p>Dalam pengembangan web, konsep ini dikenal sebagai <strong>DOM (<i>Document Object Model</i>)</strong>. DOM adalah struktur yang merepresentasikan seluruh elemen dalam sebuah halaman web sebagai objek yang bisa diakses dan dimanipulasi menggunakan JavaScript. 
    DOM berperan penting dalam pengembangan web dinamis, di mana halaman web dapat diubah secara langsung oleh skrip JavaScript tanpa memuat ulang halaman tersebut. 
      Setiap elemen HTML seperti paragraf, tombol, gambar, dan tautan dianggap sebagai objek yang memiliki properti dan metode yang bisa kita ubah sesuai kebutuhan.</p>
    
    </>
  );

  const materiContent2 = (  
    <>
    <Header title="Objek dalam DOM: Properti dan Method" />
    <p>Objek dalam DOM, seperti <code>document</code> atau elemen HTML lainnya (misalnya <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;input&gt;</code>, dan sebagainya), memiliki dua komponen utama:</p>

      <ul>
        <li><strong>Properti (<i>Property</i>)</strong>: Digunakan untuk menyimpan informasi dari sebuah objek. Contoh properti seperti <code>innerText</code>, <code>style</code>, dan <code>innerHTML</code>.</li>
        <li><strong>Metode (<i>Method</i>)</strong>: Fungsi bawaan yang dapat digunakan untuk melakukan suatu aksi terhadap objek. Contoh method seperti <code>getElementById()</code>, <code>setAttribute()</code>, dan <code>appendChild()</code>.</li>
      </ul>
    </>
  );

  const materiContent3 = (
    <>    
    <Header title="DOM Bekerja di Sisi Client (Client-Side)" />
    <p>DOM adalah representasi struktur dokumen HTML yang dibuat dan dikelola oleh browser di sisi <em>client</em> (pengguna). Artinya, ketika kita menggunakan JavaScript untuk mengubah isi halaman melalui DOM, yang berubah hanya tampilan di browser pengguna saja, bukan file HTML di server.</p>
    <p>Perhatikan kode di bawah ini!</p> 
    <KodeEditor
    code={`<!DOCTYPE html>
<html lang="id">
<body>
  <h1 id="judul">Teks Awal</h1>
  
  <button onclick="ubahTeks()">Klik untuk Ubah Teks</button>

  <script>
    function ubahTeks() {
      document.getElementById("judul").innerText = "Selamat Datang!";
    }
  </script>
</body>
</html>`}
         runnable={true}
        />
        <br></br> 
        <p>Kode HTML di atas merupakan contoh sederhana yang menunjukkan bagaimana JavaScript dapat memanipulasi <strong>DOM (Document Object Model)</strong> secara langsung di sisi <em>client</em>, yaitu di dalam browser pengguna.</p>
        <p>Saat halaman pertama kali dimuat, elemen <code>&lt;h1&gt;</code> menampilkan teks <strong>"Teks Awal"</strong>, dan terdapat sebuah tombol dengan label <strong>"Klik untuk Ubah Teks"</strong>. Tombol ini memiliki atribut <code>onclick</code> yang akan memanggil fungsi JavaScript bernama <code>ubahTeks()</code> ketika diklik.</p>
        <p>Di dalam fungsi <code>ubahTeks()</code>, digunakan method <code>document.getElementById("judul")</code> untuk mengakses elemen <code>&lt;h1&gt;</code> berdasarkan nilai <code>id</code>-nya, yaitu <strong>"judul"</strong>. Kemudian, teks dalam elemen tersebut diubah menggunakan properti <code>innerText</code> menjadi <strong>"Selamat Datang!"</strong>.</p>
        <p>Dengan demikian, ketika pengguna mengklik tombol, teks pada elemen <code>&lt;h1&gt;</code> yang sebelumnya bertuliskan <strong>"Teks Awal"</strong> akan langsung berubah menjadi <strong>"Selamat Datang!"</strong> di tempat yang sama.</p>
        <p><strong>Yang penting untuk dipahami</strong> adalah bahwa perubahan ini hanya terjadi di dalam browser pengguna (<em>client-side</em>). File HTML asli yang tersimpan di server <strong>tidak mengalami perubahan</strong> sama sekali.</p>
    </>
  );

const questions = [
  {
    id: 1,
    question: "Jika sebuah halaman web diubah menggunakan JavaScript DOM, perubahan tersebut akan ....",
    options: [
      "Mengubah file HTML asli di server secara permanen",
      "Terjadi hanya di browser pengguna saat itu saja",
      "Mengubah semua browser pengguna lain yang membuka halaman sama.",
      "Mengubah database server secara langsung",
      "Memperbarui kode sumber halaman di server.",
    ],
    correctAnswer: "Terjadi hanya di browser pengguna saat itu saja",
    feedback: "JavaScript hanya mengubah tampilan halaman di sisi client (browser pengguna). File HTML asli yang ada di server tidak ikut berubah."
  },
  {
    id: 2,
    question: "Seorang mahasiswa mengatakan bahwa properti dalam DOM seperti innerText dan style adalah fungsi untuk mengatur aksi pada elemen HTML. Pernyataan ini kurang tepat karena ....",
    options: [
      "Properti tidak bisa digunakan pada elemen HTML",
      "Properti adalah bagian dari server, bukan browser",
      "Properti hanya bisa digunakan untuk membuat halaman baru",
      "Properti menyimpan informasi, bukan melakukan aksi",
      "Properti digunakan untuk memuat ulang seluruh halaman",
    ],
    correctAnswer: "Properti menyimpan informasi, bukan melakukan aksi",
    feedback: "Properti menyimpan atau menampilkan informasi dari objek (misalnya teks dalam elemen), sedangkan aksi dilakukan oleh method seperti appendChild() atau getElementById()."
  },
  {
    id: 3,
    question: "Perhatikan kode berikut ini! Kode tersebut berfungsi untuk ....",
    image: "/Aktivitas/aktivitas1_no3.png",
    options: [
      "Menambahkan elemen <h1> baru ke halaman",
      "Menghapus elemen <h1> dari halaman",
      "Menyalin teks dari elemen dengan id \"judul\" ke clipboard",
      "Mengubah teks dari elemen yang memiliki id \"judul\" menjadi \"Halo\"",
      "Menambahkan atribut baru ke elemen dengan id \"judul\"",
    ],
    correctAnswer: "Mengubah teks dari elemen yang memiliki id \"judul\" menjadi \"Halo\"",
    feedback: "Kode tersebut menggunakan document.getElementById(\"judul\").innerText = \"Halo\" untuk mengubah isi teks dari elemen <h1> (atau elemen lain) yang memiliki id=\"judul\"."
  },
  {
    id: 4,
    question: "Saat pengguna mengklik tombol dan fungsi JavaScript mengubah isi elemen tertentu, peristiwa ini terjadi di ....",
    options: [
      "Server database",
      "Editor HTML",
      "Server",
      "Client (browser)",
      "Kode sumber HTML",
    ],
    correctAnswer: "Client (browser)",
    feedback: "DOM dimanipulasi langsung oleh browser pengguna. Perubahan ini tidak terjadi di server, melainkan di sisi client saat halaman sedang ditampilkan."
  },
  {
    id: 5,
    question: "Yang membedakan DOM dari file HTML biasa adalah ....",
    options: [
      "DOM hanya menyimpan file CSS",
      "DOM hanya tersedia di server",
      "DOM adalah representasi struktur HTML dalam bentuk objek yang bisa dimanipulasi",
      "DOM tidak bisa diakses melalui JavaScript",
      "DOM hanya digunakan untuk membuat database",
    ],
    correctAnswer: "DOM adalah representasi struktur HTML dalam bentuk objek yang bisa dimanipulasi",
    feedback: "DOM adalah cara browser menggambarkan HTML dalam bentuk struktur objek JavaScript, sehingga bisa diakses dan dimanipulasi oleh kode JavaScript."
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
            <SidebarMahasiswa/>
          </div>
        <div className="main-content">
          <AktivitasBox
            aktivitas={
              <>
                <TujuanPembelajaran tujuan={tujuanBelajar} />
                {/* <Materi description={materiIntro} /> */}
              </>
            }
          />
          <AktivitasBox aktivitas={<Materi description={materiContent} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent2} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent3} />} />

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
                </p>{currentQuestion.image && (
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
              onClick={() => navigate("/materi/domTree")}
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

export default MateriPengenalanObject;
