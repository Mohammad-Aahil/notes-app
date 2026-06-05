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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Notes App</h1>

      {/* Search Bar */}
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Task Form */}
      <form onSubmit={addTask}>
        <input
          className="border p-2 rounded w-full mb-3"
          type="text"
          placeholder="Enter a task..."
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 "
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li
            className="flex justify-between items-center border p-3 rounded mb-2"
            key={task.id}
          >
            {editId === task.id ? (
              <>
                <input
                  className="border p-2 rounded w-sm mb-3"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button
                  onClick={() => saveEdit(task.id)}
                  className="border p-2 rounded mx-auto bg-green-500 text-white mb-3"
                >
                  Save ✅
                </button>
              </>
            ) : (
              <>
                <span>{task.todoText}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => startEdit(task)}
                  >
                    Edit 🛠️
                  </button>
                  <button
                    className="bg-red-400 px-2 py-1 rounded text-white"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
