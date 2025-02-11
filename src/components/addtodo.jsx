import React, { useState } from "react";

const AddTodo = ({ uid, onCancel, onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleAddTodo = async () => {
    if (!title || !date) return alert("Please enter both title and date!");

    setLoading(true);

    try {
      const response = await fetch("https://react-todo-server-x59m.onrender.com/addTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, task: title, date }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      setLoading(false);
      onAdd(); // Refresh tasks
      onCancel(); // Close modal
    } catch (error) {
      console.error("Error adding task:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
      <h2 className="text-xl font-bold text-center mb-4">Add ToDo</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-200"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
