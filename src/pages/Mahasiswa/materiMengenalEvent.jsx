import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Header from "../../components/header";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


const MateriMengenalEvent = () => {
    const [progress, setProgress] = useState(0);
    const [hasSeenFinalFeedback, setHasSeenFinalFeedback] = useState(false);
    const [halamanAktif, setHalamanAktif] = useState(15); // halaman saat ini
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
          <li>Mengenal dan memahami jenis event pada DOM</li>
        </ul>
        </>
    );

    const [eventMessage, setEventMessage] = useState("Coba interaksi di bawah ini");
    const [currentInteraction, setCurrentInteraction] = useState("-");
    const [windowSize, setWindowSize] = useState(`${window.innerWidth} x ${window.innerHeight}`);

    const handleEvent = (message, interaction) => {
        setEventMessage(message);
        setCurrentInteraction(interaction);
    };

    const handleResize = () => {
      setWindowSize(`${window.innerWidth} x ${window.innerHeight}`);
      handleEvent(`Ukuran jendela: ${window.innerWidth} x ${window.innerHeight}`, "Resize");
    };

    useEffect(() => {
        // Event saat halaman selesai dimuat
        handleEvent("Halaman telah dimuat!", "Load");

        // Event saat ukuran jendela berubah
        window.addEventListener("resize", handleResize);

        // Cleanup event listener saat komponen di-unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault(); // Mencegah reload halaman saat submit form
      handleEvent("Formulir telah dikirim!", "Submit");
    };

    

    const description = (
        <>
        <Header title="Mengenal Event pada DOM" />
        <p>Event dalam DOM adalah peristiwa yang dipicu oleh aksi pengguna atau sistem, seperti mengklik tombol, 
        mengetik di bidang teks, atau menggulir halaman. Event memungkinkan kita untuk menentukan bagaimana halaman web bereaksi terhadap tindakan pengguna, membuat interaksi yang lebih dinamis.</p>

        <p>Berikut beberapa jenis event yang sering digunakan dalam DOM:</p>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }} border="1">
            <thead style={{textAlign: "center"}}>
                <tr>
                    <th style={{ padding: "8px", border: "1px solid black" }}>Jenis Event</th>
                    <th style={{ padding: "8px", border: "1px solid black" }}>Penjelasan</th>
                    <th style={{ padding: "8px", border: "1px solid black" }}>Contoh Interaksi</th>
                    <th style={{ padding: "8px", border: "1px solid black" }}>Interaksi Saat Ini</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>click</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat elemen diklik.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><button onClick={() => handleEvent("Tombol diklik!", "Click")}>Klik saya</button></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Click" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>dblclick</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat elemen diklik dua kali.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><button onDoubleClick={() => handleEvent("Tombol diklik dua kali!", "DblClick")}>Klik dua kali</button></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "DblClick" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>mouseover</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat mouse berada di atas elemen.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><button onMouseOver={() => handleEvent("Mouse berada di atas tombol!", "MouseOver")}>Hover saya</button></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "MouseOver" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>mouseout</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat mouse meninggalkan elemen.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><button onMouseOut={() => handleEvent("Mouse meninggalkan tombol!", "MouseOut")}>Arahkan mouse lalu keluar</button></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "MouseOut" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>keydown</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat tombol keyboard ditekan.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><input type="text" onKeyDown={() => handleEvent("Tombol ditekan!", "KeyDown")} placeholder="Tekan tombol keyboard" /></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "KeyDown" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>keyup</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat tombol keyboard dilepaskan.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><input type="text" onKeyUp={() => handleEvent("Tombol dilepaskan!", "KeyUp")} placeholder="Tekan tombol keyboard" /></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "KeyUp" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>keypress</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat tombol karakter ditekan.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}><input type="text" onKeyPress={() => handleEvent("Tombol karakter ditekan!", "KeyPress")} placeholder="Tekan tombol keyboard" /></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "KeyPress" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>submit</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat formulir dikirimkan.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Ketik sesuatu" required />
                            <button type="submit">Kirim</button>
                        </form>
                    </td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Submit" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>focus</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat elemen mendapatkan fokus.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>
                        <input type="text" onFocus={() => handleEvent("Input mendapatkan fokus!", "Focus")} placeholder="Klik di sini" />
                    </td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Focus" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>blur</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat elemen kehilangan fokus.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>
                        <input type="text" onBlur={() => handleEvent("Input kehilangan fokus!", "Blur")} placeholder="Klik lalu pindah" />
                    </td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Blur" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>load</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat halaman selesai dimuat.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Otomatis saat halaman dimuat.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Load" ? eventMessage : "-"}</td>
                </tr>
                <tr>
                    <td style={{ padding: "8px", border: "1px solid black" }}><code>resize</code></td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Saat ukuran jendela diubah.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>Coba ubah ukuran jendela browser.</td>
                    <td style={{ padding: "8px", border: "1px solid black" }}>{currentInteraction === "Resize" ? eventMessage : "-"}<br/></td>
                </tr>
            </tbody>
        </table>
        </>
    );

    const questions = [
    {
        id: 1,
        question: "Seorang developer ingin membuat tampilan yang akan berubah warna latar belakangnya saat pointer diarahkan ke elemen dan kembali ke semula saat pointer keluar. Kombinasi event yang paling tepat untuk ini adalah ....",
        options: [
        "focus dan blur",
        "keydown dan keyup",
        "mouseover dan mouseout",
        "click dan dblclick",
        "submit dan reset",
        ],
        correctAnswer: "mouseover dan mouseout",
        feedback: "Event mouseover dan mouseout digunakan untuk mendeteksi saat pointer masuk dan keluar dari elemen, sehingga cocok untuk efek hover."
    },
    {
        id: 2,
        question: "Seorang mahasiswa ingin membuat tombol yang menampilkan pesan “Halo!” saat diklik. Event DOM yang paling sesuai untuk digunakan adalah ....",
        options: [
        "mouseover",
        "click",
        "keydown",
        "blur",
        "mouseout",
        ],
        correctAnswer: "click",
        feedback: "Event click dipicu saat elemen diklik, sehingga cocok untuk menampilkan pesan saat tombol ditekan."
    },
    {
        id: 3,
        question: "Perbedaan utama antara event keyup dan keydown adalah ....",
        options: [
        "keyup terjadi saat tombol ditekan, keydown saat dilepas",
        "keyup dan keydown adalah event yang sama",
        "keyup hanya untuk huruf besar",
        "keyup terjadi saat tombol dilepas, keydown saat ditekan",
        "keydown hanya bekerja pada textarea",
        ],
        correctAnswer: "keyup terjadi saat tombol dilepas, keydown saat ditekan",
        feedback: "Event keydown terjadi saat tombol keyboard ditekan, sedangkan keyup terjadi saat tombol dilepas."
    },
    {
        id: 4,
        question: "Sebuah aplikasi web perlu memicu aksi hanya saat pengguna selesai mengetik pada sebuah input teks. Event yang paling tepat digunakan untuk mendeteksi momen tersebut adalah ....",
        options: [
        "keydown",
        "keypress",
        "keyup",
        "focus",
        "blur",
        ],
        correctAnswer: "keyup",
        feedback: "Event keyup terjadi saat tombol dilepas, sehingga menandakan pengguna selesai mengetik karakter."
    },
    {
    id: 5,
    question: "Event DOM yang terjadi saat sebuah halaman web selesai dimuat oleh browser adalah ....",
    options: [
        "click",
        "load",
        "submit",
        "keydown",
        "focus",
    ],
    correctAnswer: "load",
    feedback: "Event load dipicu ketika halaman web beserta semua sumber dayanya sudah selesai dimuat oleh browser."
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
        <div className="sidebar-wrapper" >
          <SidebarMahasiswa />
        </div>
        <div className="main-content">
            <AktivitasBox aktivitas={
            <>
                <TujuanPembelajaran tujuan={tujuanBelajar} />
            </>
            }/>
            <AktivitasBox aktivitas={<Materi description={description} />} />  
           
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
            onClick={() => navigate("/materi/menanganiEventDom")}
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

export default MateriMengenalEvent;
