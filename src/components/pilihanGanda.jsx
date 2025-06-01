const PilihanGanda = ({ question, selectedAnswer, onSelectAnswer }) => {
  if (!question) return null;

  return (
    <div className="question p-3 border-primary rounded">
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
          const optionId = String.fromCharCode(65 + index); // A, B, C, D, E...
          const isSelected = selectedAnswer === optionId;

          return (
            <div key={optionId} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                id={`option-${question.id}-${optionId}`}
                value={optionId} // Gunakan optionId jika ingin menyimpan ID opsi
                checked={isSelected}
                onChange={() => onSelectAnswer(question.id, optionId)}
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

export default PilihanGanda;
