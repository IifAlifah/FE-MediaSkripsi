import React, { useState, useEffect } from "react";
import Question from "../../components/question";
import QuizResult from "../../components/hasil";
import questions from "../../data/kuis/question.json";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Indeks soal saat ini
  const [answers, setAnswers] = useState({}); // Menyimpan jawaban pengguna
  const [timer, setTimer] = useState(2400); // Waktu dalam detik (40 menit = 2400 detik)
  const [quizCompleted, setQuizCompleted] = useState(false); // Status apakah kuis sudah selesai


  // Fungsi untuk menyimpan jawaban pengguna
  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  // Navigasi soal berikutnya
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigasi soal sebelumnya
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Mengarahkan ke soal tertentu berdasarkan index
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Menyimpan kuis
  const saveQuiz = () => {
    console.log("Jawaban Anda:", answers);
    alert("Kuis selesai! Jawaban Anda telah disimpan.");
  };

  // Timer countdown
  useEffect(() => {
    if (timer === 0) {
      setQuizCompleted(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Fungsi untuk format waktu dalam format mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Mengecek apakah semua soal sudah dijawab
  const isQuizCompleted = Object.keys(answers).length === questions.length;

  return (
    <div className="d-flex flex-column min-vh-100" style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Header Kuis */}
      <div className="quiz-header d-flex justify-content-between align-items-center p-3 border-bottom">
        <h4 className="text-primary me-4">KUIS 1 Pengenalan DOM</h4>
        {/* Tampilkan timer hanya jika kuis belum selesai */}
        {!quizCompleted && (
          <div className="timer me-4">
            <strong>Waktu: {formatTime(timer)}</strong>
          </div>
        )}
      </div>

      {/* Konten Kuis */}
      {!quizCompleted ? (
        <div className="row flex-grow-1 p-3">
          {/* Kolom Navigasi dan Soal */}
          <div className="col-12 col-md-3 mb-4">
            <div className="d-flex flex-wrap justify-content-center">
              <p className="text-primary bold">Navigasi Soal</p>
              {/* Menampilkan tombol soal dalam 5 tombol per baris */}
              {Array.from({ length: Math.ceil(questions.length / 5) }).map((_, rowIndex) => (
                <div key={rowIndex} className="d-flex w-100 justify-content-center">
                  {questions.slice(rowIndex * 5, rowIndex * 5 + 5).map((question, index) => (
                    <button
                      key={index + rowIndex * 5}
                      className={`btn ${answers[question.id] ? "btn-info" : (currentQuestion === index + rowIndex * 5 ? "btn-primary" : "btn-outline-primary") } m-1`}
                      style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                      onClick={() => goToQuestion(index + rowIndex * 5)}
                    >
                      {index + 1 + rowIndex * 5}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-3">
              <p className="alert alert-info text-center">Tekan tombol SIMPAN JAWABAN setelah semua soal sudah terjawab.</p>
            </div>
          </div>

          {/* Soal (Kanan) */}
          <div className="col-12 col-md-9">
            <div className="question-container">
              <Question
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                selectedAnswer={answers[questions[currentQuestion].id]}
              />

              {/* Navigasi soal */}
              <div className="navigation mt-4 d-flex justify-content-between me-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  &laquo; Sebelumnya
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Selanjutnya &raquo;
                </button>
              </div>

              {/* Tombol Selesai */}
              {isQuizCompleted && !quizCompleted && (
                <div className="mt-4">
                  <button className="btn btn-success" onClick={saveQuiz}>
                    SIMPAN JAWABAN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Menampilkan hasil kuis
        <QuizResult
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          score={score}
          isPassed={isPassed}
          onRetry={() => window.location.reload()} // Bisa juga untuk mengulang kuis
          onBackToMaterial={() => console.log('Kembali ke materi')} // Implementasikan kembali ke materi
        />
      )}
    </div>
  );
};

export default Quiz;
