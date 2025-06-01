import React, { useState, useEffect } from "react";

const IsianKuis = ({ question, onAnswer, initialAnswers }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const inputCount = question.code.split("input").length - 1;
    const savedAnswers =
      Array.isArray(initialAnswers) && initialAnswers.length === inputCount
        ? initialAnswers
        : Array(inputCount).fill("");
    setAnswers(savedAnswers);
  }, [question, initialAnswers]);

  const handleInputChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    onAnswer(question.id, updated);
  };

  return (
    <div>
      <h5>{question.question}</h5>
      <div className="border p-3 mb-3 bg-light">
        <pre>
          {question.code.split("input").map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <input
                  value={answers[index - 1] || ""}
                  onChange={(e) => handleInputChange(index - 1, e.target.value)}
                  style={{ margin: "0 5px", padding: "2px" }}
                />
              )}
              {part}
            </React.Fragment>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default IsianKuis;
