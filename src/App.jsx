import React, { useState } from "react";
import useInput from "./hooks/useInput";

const App = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTasks(e) {
    e.preventDefault();
    if (!inputTodo.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        todoText: inputTodo,
      },
    ]);
    setInputTodo("");
  }

  const deleteTasks = (idToDelete) => {
    return setTasks(tasks.filter((task) => task.id !== idToDelete));
  };
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

      {tasks.map((task) => (
        <li key={task.id}>
          {task.todoText}
          <button
            onClick={() => {
              deleteTasks(task.id);
            }}
          >
            Delete ❌
          </button>
        </li>
      ))}
    </div>
  );
};

export default App;
