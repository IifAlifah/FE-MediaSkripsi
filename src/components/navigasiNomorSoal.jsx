const NavigasiNomorSoal = ({ questions = [], answers = {}, currentQuestion, goToQuestion, markedDoubt = [] }) => {
    return (
      <div className="navigator p-3" style={{ maxWidth: '500px' }}>
        <h5 className="mb-3">Navigasi Soal</h5>
  
        <div className="d-flex flex-wrap">
          {questions.map((question, index) => {
            // Mengecek apakah soal sudah dijawab, ditandai sebagai ragu, atau sedang aktif
            const isAnswered = answers[question.id];
            const isDoubt = markedDoubt.includes(question.id);
            const isActive = currentQuestion === index;
  
            // Menentukan kelas tombol sesuai status
            let btnClass = "btn-outline-primary";
  
            if (isActive) {
              btnClass = "btn-primary"; // Soal yang sedang aktif
            } else if (isDoubt) {
              btnClass = "btn-warning"; // Soal yang ditandai ragu
            } else if (isAnswered) {
              btnClass = "btn-info"; // Soal yang sudah dijawab
            }
  
            return (
              <button
                key={question.id} // Menggunakan question.id untuk key yang unik
                className={`btn ${btnClass} m-1`}
                style={{ width: "50px", height: "50px", borderRadius: "50%", fontSize: "14px" }}
                onClick={() => goToQuestion(index)} // Navigasi ke soal yang dipilih
              >
                {index + 1}
              </button>
            );
          })}
        </div>
  
        <hr />
  
        <div className="mt-3 small">
          <p><span className="btn btn-primary btn-sm me-2" /> Soal saat ini</p>
          <p><span className="btn btn-info btn-sm me-2" /> Sudah dijawab</p>
          <p><span className="btn btn-warning btn-sm me-2" /> Ragu-ragu</p>
          <p><span className="btn btn-outline-primary btn-sm me-2" /> Belum dijawab</p>
        </div>
  
      </div>
    );
  };
  
  export default NavigasiNomorSoal;
  