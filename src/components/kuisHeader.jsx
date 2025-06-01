import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KuisHeader = ({ title, durationMinutes, onStart }) => {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const navigate = useNavigate();

  useEffect(() => {
    // Kirim waktu mulai ke parent saat pertama render
    const startTime = new Date();
    onStart?.(startTime);
  }, [onStart]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      alert("Waktu habis! Kuis akan diarahkan ke halaman hasil.");
      navigate("/hasil");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-light border p-3 text-primary w-100">
      <h5 className="mb-0">{title}</h5>
      <span className="badge bg-primary text-white px-3 py-2 me-3 fs-6">
        Sisa Waktu: {formatTime(secondsLeft)}
      </span>
    </div>
  );
};

export default KuisHeader;
