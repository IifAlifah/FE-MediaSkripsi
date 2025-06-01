import React from "react";

const Question = ({ question, onAnswer, selectedAnswer }) => {
  const handleOptionChange = (e) => {
    onAnswer(question.id, e.target.value); 
  };

  return (
    <div className="question-box border p-3 rounded">
      <p><strong>SOAL {question.id}:</strong> {question.question}</p>
      {question.options.map((option, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name={`question-${question.id}`}
            id={`option-${question.id}-${index}`}
            value={option}
            checked={selectedAnswer === option}
            onChange={handleOptionChange}
          />
          <label
            className="form-check-label"
            htmlFor={`option-${question.id}-${index}`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;
