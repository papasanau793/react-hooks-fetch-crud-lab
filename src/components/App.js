// src/components/App.js
import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <nav>
        <button onClick={() => setPage("Form")}>New Question</button>
        <button onClick={() => setPage("List")}>View Questions</button>
      </nav>
      {page === "List" ? (
        <section>
          <h1>Quiz Questions</h1>
          <QuestionList
            questions={questions}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        </section>
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;
