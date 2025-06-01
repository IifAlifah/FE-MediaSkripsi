import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import IsianKuis from "../../../components/isianKuis";
import NavigasiNomorSoal from "../../../components/navigasiNomorSoal";
import KuisHeader from "../../../components/kuisHeader";
import questions from "../../../data/kuis/kuis4.json";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Kuis4 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedDoubt, setMarkedDoubt] = useState([]);
  const [kkm, setKkm] = useState(70); 
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(14); // halaman saat ini
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  let decodedToken = null;
  let mahasiswaId = null;
  let tokenKelas = null;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      mahasiswaId = decodedToken.mahasiswaId;
      tokenKelas = decodedToken.token_kelas;
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }

  useEffect(() => {
    const cekSudahLulus = async () => {
      if (!mahasiswaId) return;

      try {
        // Ambil nilai terakhir
        const resNilai = await axios.get(
          `http://localhost:5000/nilai/terbaru?mahasiswaId=${mahasiswaId}&jenisKuis=Manipulasi Konten`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const nilai = resNilai.data.nilai;

        // Ambil nilai KKM
        const nilaiKKM = await fetchKKM(mahasiswaId);
        if (nilaiKKM === null) return;

        // Jika sudah lulus, redirect ke halaman hasil
        if (nilai >= nilaiKKM) {
          navigate("/hasil-kuis", {
             state: {
              mahasiswaId, 
              tokenKelas, 
              jenisKuis: "Manipulasi Konten",
              nextMaterialPath: "/materi/mengenalEvent",
              prevMaterialPath: "/materi/mengubahKonten",
              retryQuizPath: "/kuis4",
            },
          });
        }
      } catch (error) {
        console.log("Belum pernah mengerjakan atau gagal cek nilai:", error.response?.data || error.message);
      }
    };

    cekSudahLulus();
  }, [mahasiswaId]);

  const fetchKKM = async (mahasiswaId) => {
      try {
        const token = localStorage.getItem("token"); // atau ambil token dari state/context
  
        const response = await axios.get(`http://localhost:5000/kkm/${mahasiswaId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data.kkm; // sesuaikan dengan apa yang dikirim backend
      } catch (error) {
        console.error("Gagal fetch KKM:", error);
        return null;
      }
    };

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

    const saveScore = async (score, correctAnswersCount, wrongAnswersCount) => {
      try {
        const data = {
          mahasiswaId,
          jenisKuis: "Manipulasi Konten",
          nilai: score,
          benar: correctAnswersCount,
          salah: wrongAnswersCount,
        };
        const res = await axios.post("http://localhost:5000/nilai", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Nilai berhasil disimpan:", res.data);
      } catch (err) {
        console.error("Gagal menyimpan nilai:", err.response?.data || err.message);
      }
    };
  

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];

      if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.some((ans) => ans.trim() === ""))) {
        wrongAnswersCount++;
        return;
      }

      const isArrayAnswer = Array.isArray(userAnswer);
      const trimmedUserAnswer = isArrayAnswer
        ? userAnswer.map((ans) => ans.trim())
        : userAnswer.trim();

      const isCorrect = isArrayAnswer
        ? (
            Array.isArray(question.correctAnswers) &&
            trimmedUserAnswer.length === question.correctAnswers.length &&
            trimmedUserAnswer.every((ans, i) => ans === question.correctAnswers[i])
          )
        : question.correctAnswers.some((correct) => correct.trim() === trimmedUserAnswer);

      if (isCorrect) {
        correctAnswersCount++;
      } else {
        wrongAnswersCount++;
      }
    });

    return { correctAnswersCount, wrongAnswersCount };
  };

  const handleFinishQuiz = async () => {
    const { correctAnswersCount, wrongAnswersCount } = calculateScore();
    const score = (correctAnswersCount / questions.length) * 100;

    if (!mahasiswaId || !tokenKelas) {
      alert("Data user atau kelas tidak ditemukan!");
      return;
    }

    const kkm = await fetchKKM(mahasiswaId);
      if (kkm === null) {
        alert("Gagal mengambil nilai KKM, coba lagi nanti.");
        return;
      }

    if (score >= kkm) {
        if (halamanAktif >= progress) {
          await updateProgress(halamanAktif);
        }
    }

    await saveScore(score, correctAnswersCount, wrongAnswersCount);
    navigate("/hasil-kuis", {
      state: {
        mahasiswaId, 
        tokenKelas, 
        jenisKuis: "Manipulasi Konten",
        nextMaterialPath: "/materi/mengenalEvent",
        prevMaterialPath: "/materi/mengubahKonten",
        retryQuizPath: "/kuis4",
      },
    });
  };

  return (
    <>
      <KuisHeader title="Kuis Manipulasi Konten" durationMinutes={30} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-light border-end" style={{ minHeight: "100vh" }}>
            <NavigasiNomorSoal
              questions={questions}
              answers={answers}
              currentQuestion={currentQuestionIndex}
              goToQuestion={goToQuestion}
              markedDoubt={markedDoubt}
            />
          </div>

          <div className="col-md-9 p-4">
            <IsianKuis
              question={currentQuestion}
              onAnswer={handleSelectAnswer}
              initialAnswers={answers[currentQuestion.id]}
            />

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkboxRagu"
                checked={markedDoubt.includes(currentQuestion.id)}
                onChange={() => {
                  setMarkedDoubt((prev) =>
                    prev.includes(currentQuestion.id)
                      ? prev.filter((id) => id !== currentQuestion.id)
                      : [...prev, currentQuestion.id]
                  );
                }}
              />
              <label className="form-check-label" htmlFor="checkboxRagu">
                Tandai sebagai ragu-ragu
              </label>
            </div>

            <div className="mt-4 d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentQuestionIndex === 0}
              >
                Sebelumnya
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))
                  }
                >
                  Selanjutnya
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleFinishQuiz}>
                  Simpan Jawaban
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kuis4;
