import React, { useEffect, useState } from "react";

const App = () => {
  // Input field state
  const [inputTodo, setInputTodo] = useState("");

  // All tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save Tasks in LS
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Stores which task is currently being edited
  const [editId, setEditId] = useState(null);

  // Stores edited text
  const [editText, setEditText] = useState("");

  // Enabling Search Filter
  const [search, setSearch] = useState("");

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (!inputTodo.trim()) return;

    const newTask = {
      id: Date.now(),
      todoText: inputTodo,
    };

    setTasks([...tasks, newTask]);
    setInputTodo("");
  };

  // Delete task by id
  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  // Enter edit mode
  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.todoText);
  };

  // Save edited task
  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, todoText: editText } : task,
    );

    setTasks(updatedTasks);
    setEditId(null);
    setEditText("");
  };

  // Search Filtering Function
  const filteredTasks = tasks.filter((task) =>
    task.todoText.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Todo App</h2>

      {/* Search Bar */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => saveEdit(task.id)}>Save ✅</button>
              </>
            ) : (
              <>
                <span>{task.todoText}</span>

                <button onClick={() => startEdit(task)}>Edit 🛠️</button>

                <button onClick={() => deleteTask(task.id)}>Delete ❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
