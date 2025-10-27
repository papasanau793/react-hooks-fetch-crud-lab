import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onUpdate }) {
  return (
    <ul>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default QuestionList;
