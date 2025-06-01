import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import ModalPetunjukKuisIsian from "../../components/modalPetunjukKuisIsian.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriNodeTraversing = () => {
  const [showModal, setShowModal] = useState(false); 
    const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(8); // halaman saat ini
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

    const tujuanBelajar = (
        <>
        <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
        <ul>
          <li>Memahami konsep Node Traversing dalam struktur DOM sebagai cara untuk menavigasi antar elemen HTML</li>
        </ul>
        </>
      )

    const description = (
        <>
            <Header title="Node Traversing" />
            <p>
                Setelah memilih sebuah elemen dalam dokumen, terkadang kita perlu menemukan elemen lain yang memiliki hubungan struktural dengannya, seperti induk (parent), saudara (siblings), atau anak (children). Teknik yang digunakan untuk menavigasi elemen-elemen ini dalam struktur dokumen disebut <b>Node Traversing</b>.
            </p>
            <p>
                <b>Node Traversing</b> adalah teknik dalam <i>Document Object Model (DOM)</i> yang memungkinkan kita berpindah di antara node-node dalam pohon dokumen HTML. DOM merepresentasikan halaman web sebagai pohon node, di mana setiap elemen HTML, atribut, dan teks dianggap sebagai node yang dapat diakses serta dimanipulasi. Dengan menggunakan metode traversing, kita bisa dengan mudah mencari dan mengelola elemen-elemen terkait dalam hierarki DOM.
            </p>
            <p>Berikut adalah beberapa properti yang digunakan untuk menavigasi node:</p>
    
            1. <strong>Menavigasi Induk (<i>Parent Node</i>)</strong>
            <p>
                <b>parentNode</b>: Digunakan untuk mendapatkan elemen induk dari sebuah node. Properti ini memungkinkan kita berpindah dari elemen anak ke elemen induknya dalam struktur DOM.
                Perhatikan code dibawah ini
            </p>
                <KodeEditor
        key="editor1"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let child = document.getElementById("first");
        let parent = child.parentNode; 
        document.getElementById("output").textContent = "Induk dari #first adalah: " + parent.nodeName;
    </script>
    
</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>
        Ketika halaman web dijalankan, JavaScript akan mengeksekusi kode untuk mencari elemen dengan <code>id="first"</code>, yaitu elemen <code>&lt;p&gt;</code> pertama di dalam <code>&lt;div id="parent"&gt;</code>. 
        Selanjutnya, dengan menggunakan properti <code>parentNode</code>, JavaScript akan menemukan induk dari elemen tersebut, yang dalam hal ini adalah <code>&lt;div id="parent"&gt;</code>. 
        Kemudian, nilai <code>nodeName</code> dari elemen induk diambil, yang mengembalikan <code>"DIV"</code> dalam huruf kapital karena <code>nodeName</code> selalu mengembalikan nama elemen dalam huruf besar. 
        Hasil ini kemudian ditampilkan dalam elemen <code>&lt;p id="output"&gt;</code>, sehingga ketika halaman ditampilkan, pengguna akan melihat teks <code>"Induk dari #first adalah: DIV"</code>. 
        Hal ini menunjukkan bahwa <code>parentNode</code> berhasil digunakan untuk menavigasi dari elemen anak ke elemen induknya dalam struktur DOM.

        </p>
    
        </>
    );

    const description2 = (
        <>  
         2. <strong>Menavigasi Anak (<i>Child Nodes</i>)</strong>
            <ul>
                <li>
                    <b>childNodes</b>: Mengembalikan daftar semua node anak, termasuk elemen, teks, dan spasi sebagai <i>NodeList</i> (mirip array).
                </li>
                <p>Perhatikan code dibawah ini</p>
                <KodeEditor
        key="editor2"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let parent = document.getElementById("parent");
        let children = parent.childNodes;
        document.getElementById("output").textContent = "Jumlah anak dari #parent: " + children.length;
    </script>
    
</body>
</html>`}
         runnable={true}
         editorId="editor2" 
        />
        <br></br>

        <p>Ketika halaman web dijalankan, JavaScript akan mengeksekusi kode untuk mencari elemen dengan <code>id="parent"</code>, yaitu elemen <code>&lt;div&gt;</code> yang berisi dua elemen <code>&lt;p&gt;</code> di dalamnya. 
        Selanjutnya, properti <code>childNodes</code> digunakan untuk mendapatkan semua node anak dari elemen <code>&lt;div id="parent"&gt;</code>. 
        Perlu diketahui bahwa <code>childNodes</code> tidak hanya mengambil elemen-elemen HTML seperti <code>&lt;p&gt;</code>, tetapi juga mencakup node teks (<code>#text</code>) yang dihasilkan oleh spasi atau baris baru dalam kode HTML.
        </p>
        Karena dalam struktur HTML terdapat dua elemen <code>&lt;p&gt;</code>, dan ada spasi atau baris baru di antara elemen-elemen tersebut, <code>childNodes</code> akan mengembalikan daftar node yang mencakup elemen <code>&lt;p&gt;</code> serta node teks (<code>#text</code>). 
        Akibatnya, jumlah node anak yang dihitung oleh <code>children.length</code> bisa lebih dari dua, biasanya lima dalam kebanyakan browser, yaitu:
        <ol>
            <li>Node teks (spasi sebelum <code>&lt;p id="first"&gt;</code>)</li>
            <li>Elemen <code>&lt;p id="first"&gt;</code></li>
            <li>Node teks (spasi antara <code>&lt;p id="first"&gt;</code> dan <code>&lt;p id="second"&gt;</code>)</li>
            <li>Elemen <code>&lt;p id="second"&gt;</code></li>
            <li>Node teks (spasi setelah <code>&lt;p id="second"&gt;</code>)</li>
        </ol>
        <br></br>
        <p>
        Akhirnya, hasil ini ditampilkan dalam elemen <code>&lt;p id="output"&gt;</code>, sehingga pengguna akan melihat teks <code>"Jumlah anak dari #parent: 5"</code> atau jumlah yang sesuai berdasarkan struktur DOM yang terbentuk.
        </p>
        <br></br>

                <li>
                    <b>firstChild</b>: Mengembalikan anak pertama dari suatu elemen, termasuk jika anak tersebut adalah teks (spasi).
                </li>
                <p>Perhatikan code dibawah ini</p>
                <KodeEditor
        key="editor3"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let parent = document.getElementById("parent");
        let firstChild = parent.firstChild;
        document.getElementById("output").textContent = "Anak pertama dari #parent adalah: " + firstChild.nodeName;
    </script>    
    
</body>
</html>`}
         runnable={true}
         editorId="editor3" 
        />
        <br></br>

        <p>
        Ketika halaman web dijalankan, JavaScript akan mengeksekusi kode untuk mencari elemen dengan <code>id="parent"</code>, yaitu elemen <code>&lt;div&gt;</code> yang berisi dua elemen <code>&lt;p&gt;</code> di dalamnya. 
        Kemudian, properti <code>firstChild</code> digunakan untuk mendapatkan anak pertama dari elemen <code>&lt;div id="parent"&gt;</code>.
        Namun, penting untuk dipahami bahwa <code>firstChild</code> mengambil node pertama, bukan hanya elemen HTML. Dalam struktur DOM, spasi atau baris baru di antara tag juga dianggap sebagai node teks (<code>#text</code>).
        Sehingga, ketika skrip menampilkan hasil dengan <code>firstChild.nodeName</code>, output yang muncul di dalam elemen <code>&lt;p id="output"&gt;</code> adalah: 
        <code>"Anak pertama dari #parent adalah: #text"</code>.
        </p>
        <br></br>

                <li>
                    <b>lastChild</b>: Mengembalikan anak terakhir dari suatu elemen, termasuk jika anak tersebut adalah teks (spasi).
                </li>
                <p>Perhatikan code dibawah ini</p>
                <KodeEditor
        key="editor4"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let parent = document.getElementById("parent");
        let lastChild = parent.lastChild;
        document.getElementById("output").textContent = "Anak terakhir dari #parent adalah: " + lastChild.nodeName;
    </script>     
    
</body>
</html>`}
         runnable={true}
         editorId="editor4" 
        />
        <br></br>
        <p>
            Ketika halaman web dijalankan, JavaScript akan mencari elemen dengan <code>id="parent"</code>, yaitu elemen <code>&lt;div&gt;</code> yang berisi dua elemen <code>&lt;p&gt;</code>. 
            Kemudian, properti <code>lastChild</code> digunakan untuk mendapatkan anak terakhir dari elemen <code>&lt;div id="parent"&gt;</code>.
            Namun, penting untuk dipahami bahwa <code>lastChild</code> mengambil node terakhir, bukan hanya elemen HTML. Dalam struktur DOM, spasi atau baris baru di antara tag juga dianggap sebagai node teks (<code>#text</code>).
            Sehingga, saat skrip menampilkan hasil menggunakan <code>lastChild.nodeName</code>, output yang muncul di dalam elemen <code>&lt;p id="output"&gt;</code> adalah: 
            <code>"Anak terakhir dari #parent adalah: #text"</code>.
        </p>
        <br></br>
            </ul>  
        </>
    );

    const description3 = (
        <>
         3. <strong>Menavigasi Saudara (<i>Sibling Nodes</i>)</strong>
            <ul>
                <li>
                    <b>nextSibling</b>: Mengembalikan node saudara setelah elemen saat ini dalam hierarki DOM, termasuk teks atau spasi.
                </li>
                <p>Perhatikan code dibawah ini</p>
                <KodeEditor
        key="editor5"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let first = document.getElementById("first");
        let next = first.nextSibling;
        document.getElementById("output").textContent = "Saudara setelah #first adalah: " + next.nodeName;
    </script>
    
</body>
</html>`}
         runnable={true}
         editorId="editor5" 
        />
        <br></br>
        <p>
             Ketika halaman web dijalankan, JavaScript akan mencari elemen dengan <code>id="first"</code>, yaitu elemen 
            <code>&lt;p id="first"&gt;Paragraf pertama&lt;/p&gt;</code>. 
            Kemudian, properti <code>nextSibling</code> digunakan untuk mendapatkan saudara (sibling) berikutnya dari elemen <code>&lt;p id="first"&gt;</code>.
            Namun, penting untuk dipahami bahwa <code>nextSibling</code> tidak hanya mengambil elemen HTML, tetapi juga memperhitungkan node teks (<code>#text</code>) yang mungkin muncul akibat spasi atau baris baru dalam kode HTML.
            Sehingga, ketika skrip menampilkan hasil dengan <code>nextSibling.nodeName</code>, output yang muncul di elemen <code>&lt;p id="output"&gt;</code> kemungkinan besar adalah:
            <code>"Saudara setelah #first adalah: #text"</code>.
        </p>
        <br></br>
                <li>
                    <b>previousSibling</b>: Mengembalikan node saudara sebelum elemen saat ini dalam hierarki DOM, termasuk teks atau spasi.
                </li>
                <p>Perhatikan code dibawah ini</p>
                <KodeEditor
        key="editor6"
        code={`
<html lang="en">
<body>
    <div id="parent">
        <p id="first">Paragraf pertama</p>
        <p id="second">Paragraf kedua</p>
    </div>
    
    <p id="output"></p>

    <script>
        let first = document.getElementById("second");
        let next = first.previousSibling;
        document.getElementById("output").textContent = "Saudara sebelum #first adalah: " + next.nodeName;
    </script>
    
</body>
</html>`}
         runnable={true}
         editorId="editor6" 
        />
        <br></br>
        <p>
            Ketika halaman web dijalankan, JavaScript akan mencari elemen dengan <code>id="second"</code>, yaitu elemen 
            <code>&lt;p id="second"&gt;Paragraf kedua&lt;/p&gt;</code>. 
            Kemudian, properti <code>previousSibling</code> digunakan untuk mendapatkan saudara (sibling) sebelumnya dari elemen <code>&lt;p id="second"&gt;</code>.
            Namun, perlu diperhatikan bahwa <code>previousSibling</code> tidak hanya mengambil elemen HTML, tetapi juga menghitung node teks (<code>#text</code>) yang mungkin muncul akibat spasi atau baris baru dalam kode HTML.
            Sehingga, ketika skrip menampilkan hasil dengan <code>previousSibling.nodeName</code>, output yang muncul di elemen <code>&lt;p id="output"&gt;</code> adalah:
            <code>"Saudara sebelum #second adalah: #text"</code>.
        </p>
            </ul>
        </>
    );

    const questions = [
    {
        id: 1,
        question: "Saat menggunakan firstChild terkadang hasil yang didapat adalah #text, hal ini terjadi karena .... ",
        options: [
        "firstChild hanya mengambil elemen p pertama",
        "spasi atau baris baru dianggap sebagai node teks",
        "tidak ada node lain selain teks",
        "semua elemen HTML selalu berupa teks",
        "firstChild memfilter node berdasarkan atribut",
        ],
        correctAnswer: "spasi atau baris baru dianggap sebagai node teks",
        feedback: "Karena spasi atau baris baru antar elemen dianggap sebagai node teks."
    },
    {
        id: 2,
        question: "Jika sebuah elemen memiliki anak berupa elemen <p> dan <span>, perintah yang digunakan untuk mendapatkan elemen terakhir di dalamnya adalah …. ",
        options: [
        "element.childNodes",
        "element.lastChild",
        "element.firstChild",
        "element.parentNode",
        "element.previousSibling",
        ],
        correctAnswer: "element.lastChild",
        feedback: "lastChild mengembalikan node anak terakhir dari sebuah elemen, yang bisa berupa elemen, teks, atau komentar."
    },
    {
        id: 3,
        question: "Perintah previousSibling pada suatu elemen digunakan untuk …. ",
        options: [
        "Mengambil elemen sebelumnya termasuk node teks",
        "Mengambil hanya elemen HTML sebelumnya",
        "Mengambil elemen induk dari elemen tersebut",
        "Mengambil elemen anak pertama dari elemen tersebut",
        "Menghapus node saudara sebelumnya",
        ],
        correctAnswer: "Mengambil elemen sebelumnya termasuk node teks",
        feedback: "previousSibling mengembalikan node sebelumnya dalam satu tingkat hierarki, termasuk node teks atau komentar."
    },
    {
        id: 4,
        question: "4. Perhatikan struktur HTML berikut. Berdasarkan struktur DOM tersebut, apa output yang akan ditampilkan di konsol browser….",
        image: "/gambar/aktivitasQuerySelector_no4.png",
        options: [
        "\"P\"",
        "\"#text\"",
        "\"DIV\"",
        "Null",
        "\"SPAN\"",
        ],
        correctAnswer: "\"#text\"",
        feedback: "Jika ada teks di antara elemen, browser akan menganggapnya sebagai node teks (#text), dan itu yang dikembalikan saat mengakses previousSibling."
    },
    {
        id: 5,
        question: "Perhatikan kode dibawah ini. Output dari kode tersebut adalah ....",
        image: "/Aktivitas/aktivitas2_no5.png",
        options: [
        "2",
        "3",
        "4",
        "5",
        "6",
        ],
        correctAnswer: "5",
        feedback: "childNodes menghitung semua node termasuk spasi (#text) antara elemen, sehingga totalnya bisa jadi 5."
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
        {!showModal && (
            <div className="sidebar">
                <SidebarMahasiswa />
            </div>
        )}
        <div className="main-content">
          <AktivitasBox aktivitas={<TujuanPembelajaran tujuan={tujuanBelajar}/>} />
          <AktivitasBox aktivitas={<Materi title="" description={description} />} />
          <AktivitasBox aktivitas={<Materi title="" description={description2} />} />
          <AktivitasBox aktivitas={<Materi title="" description={description3} />} />
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
        
         <ModalPetunjukKuisIsian
          show={showModal}
          onClose={() => setShowModal(false)}
          bab="Mengakses Elemen"
          kuis={2}
          routeMulai="/kuis3"
        />

        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/querySelector")}
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

export default MateriNodeTraversing;
