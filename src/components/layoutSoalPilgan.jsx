const LayoutSoalPilgan = ({ question, selectedAnswer, onSelectAnswer }) => {
  if (!question) return null;

  return (
    <div className="question p-3 border border-primary rounded">
      <h5 className="mb-3">Soal:</h5>
      <p>{question.question}</p>

      {/* Jika soal punya gambar */}
      {question.image && (
        <div className="mb-3 text-center">
          <img
            src={question.image}
            alt="Gambar Soal"
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>
      )}

      <div className="options mt-4">
        {question.options.map((option, index) => {
          const optionId = String.fromCharCode(65 + index); // A, B, C, D, ...
          const isSelected = selectedAnswer === option;

          return (
            <div key={optionId} className="form-check p-2 mb-2 border">
              <input
                className="form-check-input mx-1"
                type="radio"
                name={`question-${question.id}`}
                id={`option-${question.id}-${optionId}`}
                value={option}
                checked={isSelected}
                onChange={() => onSelectAnswer(question.id, option)} // ✅ Kirim teks jawaban
              />
              <label
                className="form-check-label"
                htmlFor={`option-${question.id}-${optionId}`}
              >
                <strong>{optionId}.</strong> {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutSoalPilgan;
