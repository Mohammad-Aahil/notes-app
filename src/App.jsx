import React, { useState } from "react";
import useInput from "./hooks/useInput";

const App = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTasks(e) {
    e.preventDefault();
    if (!inputTodo.trim()) return;
    setTasks([...tasks, inputTodo]);
    setInputTodo("");
  }
  return (
    <div>
      <form onSubmit={addTasks}>
        <input
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {tasks.map((t, index) => (
        <li key={index}>{t}</li>
      ))}
    </div>
  );
};

export default App;
