import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers } = question;
  const [correctIndex, setCorrectIndex] = useState(question.correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) onDelete(id);
      });
  }

  function handleAnswerChange(e) {
    const newIndex = parseInt(e.target.value);
    setCorrectIndex(newIndex); // update immediately for UI
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then(onUpdate);
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>
        {answers.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleAnswerChange}>
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
