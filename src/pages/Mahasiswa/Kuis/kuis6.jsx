import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutSoalPilgan from "../../../components/layoutSoalPilgan";
import NavigasiNomorSoal from "../../../components/navigasiNomorSoal";
import KuisHeader from "../../../components/kuisHeader";
import questions from "../../../data/kuis/kuis6.json";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Kuis2 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // menyimpan jawaban user
  const [markedDoubt, setMarkedDoubt] = useState([]);
  const navigate = useNavigate();
  const [kkm, setKkm] = useState(70); 
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(22); 
  const token = localStorage.getItem("token");

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
        `http://localhost:5000/nilai/terbaru?mahasiswaId=${mahasiswaId}&jenisKuis=Form DOM`,
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
            jenisKuis: "Form DOM",
            nextMaterialPath: "/evaluasi",
            prevMaterialPath: "/materi/mengaksesForm-elemenForm",
            retryQuizPath: "/kuis6", 
          },
        });
      }
    } catch (error) {
      console.log("Belum pernah mengerjakan atau gagal cek nilai:", error.response?.data || error.message);
    }
  };

  cekSudahLulus();
}, [mahasiswaId]);

  const currentQuestion = questions[currentQuestionIndex];
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
          {}, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          console.log("Progress berhasil diperbarui");
          const newProgress = halamanAktif + 1;
          setProgress(newProgress);
        }
      } catch (error) {
        console.error("Gagal update progress:", error.response?.data || error.message);
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
        jenisKuis: "Form DOM",
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

  // Menghitung jawaban benar dan salah
  const calculateScore = () => {
  let correctAnswersCount = 0;
  let wrongAnswersCount = 0;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];

    if (userAnswer === question.answer) {
      correctAnswersCount += 1;
    } else {
      // termasuk jika userAnswer === undefined (belum dijawab)
      wrongAnswersCount += 1;
    }
  });

  return { correctAnswersCount, wrongAnswersCount };
};


  // Ketika kuis selesai
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
        jenisKuis: "Form DOM",
        nextMaterialPath: "/evaluasi",
        prevMaterialPath: "/materi/mengaksesForm-elemenForm",
        retryQuizPath: "/kuis6", // Path untuk mengulang kuis
      },
    });
  };

  const handleSelectAnswer = (questionId, answerText) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerText }));
  };
  

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <>
      <KuisHeader title="Kuis Pengenalan DOM HTML" durationMinutes={30} />
      <div className="container-fluid">
        <div className="row">
          {/* Navigasi Soal */}
          <div className="col-md-3 bg-light border-end" style={{ minHeight: "100vh" }}>
            <NavigasiNomorSoal
              questions={questions}
              answers={answers}
              currentQuestion={currentQuestionIndex}
              goToQuestion={goToQuestion}
              markedDoubt={markedDoubt}
            />
          </div>

          {/* Soal dan Pilihan Jawaban */}
          <div className="col-md-9 p-4">
            <LayoutSoalPilgan
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onSelectAnswer={handleSelectAnswer}
            />

            {/* Tandai Ragu */}
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

            {/* Navigasi */}
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
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
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

export default Kuis2;
