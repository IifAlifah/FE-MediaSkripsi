import React, { useState } from "react";
import Input from "./input"; // Pastikan komponen Input sudah disesuaikan
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Isian = ({ questions, onSuccess }) => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [answers, setAnswers] = useState(
  Array(questions[currentIndex].code.split("input").length - 1).fill("") 
  );
  const [feedback, setFeedback] = useState(""); 
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false); 

  const currentQuestion = questions[currentIndex]; 

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const isCorrect = currentQuestion.correctAnswers.every((answer, index) =>
      answer === answers[index]
    );

    if (isCorrect) {
      setIsAnsweredCorrectly(true); 
      setFeedback("Jawaban sudah sesuai! Klik tombol Lanjut untuk melanjutkan.");
    } else {
      setIsAnsweredCorrectly(false);
      setFeedback("Masih ada jawaban yang salah, silahkan coba lagi.");
    }
  };

const handleNext = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setAnswers(
      Array(questions[currentIndex + 1].code.split("input").length - 1).fill("")
    );
    setFeedback("");
    setIsAnsweredCorrectly(false);
  } else {
    Swal.fire({
      icon: "success",
      title: "Selesai!",
      text: "Selamat! Anda telah menyelesaikan semua pertanyaan",
    });

    if (typeof onSuccess === "function") {
      onSuccess(); // Trigger kirim progress
    }
  }
};

 const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswers(
        Array(questions[currentIndex - 1].code.split("input").length - 1).fill("")
      );
      setFeedback("");
      setIsAnsweredCorrectly(false);
    }
  };

  const handleReset = () => {
    setAnswers(
      Array(currentQuestion.code.split("input").length - 1).fill("")
    ); // Reset jawaban pengguna
    setFeedback(""); // Reset feedback
    setIsAnsweredCorrectly(false); // Reset status jawaban
  };

  return (
    <div>
       <div
          className="mb-3 px-3 py-2 text-white"
            style={{
              backgroundColor: "#1F4E79",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
        >
        Soal {currentIndex + 1 } dari {questions.length}
         </div>
      <p>{currentQuestion.question}</p> {/* Menampilkan soal */}
      <div
        style={{
          border: "2px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          marginBottom: "15px",
        }}
      >
        <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {currentQuestion.code.split("input").map((chunk, index) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                chunk
              ) : (
                <>
                  <span style={{ display: "inline-block", margin: "4px 4px" }}>
                    <Input
                      value={answers[index - 1]}
                      onChange={(e) => handleInputChange(index - 1, e.target.value)}
                      style={{ width: "100px" }}
                    />
                  </span>
                  {chunk}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {feedback && (
        <div
          className={`alert d-flex align-items-start gap-2 mt-3 ${
            isAnsweredCorrectly ? "alert-success" : "alert-danger"
          }`}
        >
          <div>
            {isAnsweredCorrectly ? (
              <FaCheckCircle size={20} className="text-success" />
            ) : (
              <FaTimesCircle size={20} className="text-danger" />
            )}
          </div>
          <div>
            <strong className="d-block mb-1">
              {isAnsweredCorrectly ? "Jawaban benar!" : "Jawaban salah!"}
            </strong>
            <span>{feedback}</span>
          </div>
        </div>
      )}
      <div style={{ marginTop: 10 }} className="d-flex justify-content-between">
        {/* Tombol Kembali di kiri */}
        <div>
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="btn btn-outline-secondary me-2"
            >
              Kembali
            </button>
          )}
        </div>

        {/* Tombol Submit/Lanjut dan Reset di kanan */}
        <div>
          <button
            onClick={isAnsweredCorrectly ? handleNext : handleSubmit}
            className={`btn ${isAnsweredCorrectly ? "btn-outline-primary" : "btn-primary"} me-2`}
          >
            {isAnsweredCorrectly ? "Lanjut" : "Submit"}
          </button>

          <button
            onClick={handleReset}
            className="btn btn-outline-danger"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Isian;
