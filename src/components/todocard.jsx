const TodoCard = ({ uid, tid, title, date, status, onTaskUpdate, onEdit }) => {
    
  // Function to delete a task
  const handleDelete = async () => {
      try {
          const response = await fetch(`https://react-todo-server-x59m.onrender.com/deleteTask?uid=${uid}&tid=${tid}`, { method: "DELETE" });
          if (!response.ok) throw new Error("Failed to delete task");
          
          onTaskUpdate(); // Refresh task list
      } catch (error) {
          console.error("Error deleting task:", error);
      }
  };

  // Function to mark a task as done
  const handleMarkDone = async () => {
      try {
          const response = await fetch("https://react-todo-server-x59m.onrender.com/updateTodo", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ uid, tid }),
          });
          if (!response.ok) throw new Error("Failed to update task");

          onTaskUpdate(); // Refresh task list
      } catch (error) {
          console.error("Error updating task status:", error);
      }
  };

  return (
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative">
          <div className="flex items-center text-gray-500 text-sm sm:text-base md:text-lg mb-4">
              <i className="far fa-calendar-alt mr-2"></i>
              <span>{date}</span>
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold flex items-center mb-6">
              <i className="fas fa-arrow-right mr-2"></i>
              <span>{title}</span>
          </div>

          <div className="absolute top-4 right-4 flex space-x-3">
              <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition flex items-center space-x-2"
              >
                  <i className="fa-regular fa-trash-can"></i>
                  <span className="hidden sm:inline">Delete</span>
              </button>
          </div>

          <div className="flex justify-between mt-4">
              <button 
                  onClick={onEdit} 
                  className="bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-black hover:bg-gray-300 transition text-xs sm:text-sm flex items-center space-x-2"
              >
                  <i className="fa-regular fa-pen-to-square"></i>
                  <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                  onClick={handleMarkDone}
                  className="bg-green-500 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-white hover:bg-green-600 transition text-xs sm:text-sm flex items-center space-x-2"
              >
                  <i className="fa-solid fa-check"></i>
                  <span className="hidden sm:inline">Done</span>
              </button>
          </div>
      </div>
  );
};

export default TodoCard;

