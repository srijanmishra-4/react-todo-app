import React, { useState } from "react";

const UpdateTodo = ({ uid, tid, initialTitle, initialDate, onCancel, onTaskUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);
  const [updatedDate, setUpdatedDate] = useState(initialDate);

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://192.168.29.244:3000/editTask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, tid, task: updatedTitle, date: updatedDate }),
      });
      console.log("Inside Updatetodo Component  : " + updatedTitle);
      console.log("Updated Title  : " + updatedTitle);
      console.log("Updated Date : " + updatedDate);
      if (response.ok) {
        onTaskUpdate();
        onCancel();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">Edit Task</h2>

        <div className="mb-4">
          <label className="block text-black font-semibold text-sm sm:text-base">Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 mt-2 bg-gray-200 rounded-lg focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold text-sm sm:text-base">Date:</label>
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 mt-2 bg-gray-200 rounded-lg focus:outline-none text-sm sm:text-base"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-black hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-white hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;