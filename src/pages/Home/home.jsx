import Navbar from "../../components/navbar";
import TodoCard from "../../components/todocard";
import React, { useState, useEffect } from "react";
import AddTodo from "../../components/addtodo";
import UpdateTodo from "../../components/UpdateTodo";
import { useParams } from "react-router-dom";

const Home = () => {
    const { uid } = useParams(); // Extract uid from URL
    const [tasks, setTasks] = useState([]);
    const [uname, setUname] = useState(""); // Store username
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Track which task is being edited

    console.log(uid);

    // Fetch tasks and username from API
    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://react-todo-server-x59m.onrender.com/fetchData/${uid}`);
            if (!response.ok) throw new Error("Failed to fetch user data");

            const data = await response.json();
            console.log(data); // Debugging: Check the full response structure

            setUname(data.user?.uname || ""); // Store username

            const tasksArray = Array.isArray(data.user?.tasks) ? data.user.tasks : []; // Ensure tasks is an array
            const incompleteTasks = tasksArray.filter(task => task.status === "incomplete");

            setTasks(incompleteTasks);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setTasks([]); // Set tasks to an empty array to avoid further errors
            setUname("");
        }
    };

    useEffect(() => {
        if (uid) fetchUserData();
    }, [uid]);

    // Open & Close Modal
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    // Open & Close Edit Modal
    const handleEdit = (task) => setEditingTask(task);
    const handleCloseEdit = () => setEditingTask(null);

    // Refresh tasks after update, delete, or marking as done
    const handleTaskUpdate = () => {
        fetchUserData();
        setTimeout(() => setIsModalOpen(false), 50); // Delay closing modal slightly
    };

    return (
        <>
            <Navbar uname={uname} />
            <div className="flex justify-center items-center h-40 px-4">
                <button
                    onClick={handleOpen}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg shadow-md"
                >
                    <i className="fas fa-plus mr-2"></i> Add Task
                </button>
            </div>

            <div className="container mx-auto mt-8 px-4 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {tasks.map(t => (
                        <TodoCard
                            key={t.tid}
                            uid={uid}
                            tid={t.tid}
                            title={t.taskName}
                            date={t.date}
                            status={t.status}
                            onTaskUpdate={handleTaskUpdate}
                            onEdit={() => handleEdit(t)} // Pass task to edit
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg relative z-60 w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <AddTodo
                            uid={uid}
                            onCancel={handleClose}
                            onAdd={handleTaskUpdate}
                        />
                    </div>
                </div>
            )}

            {/* Edit Task Modal */}
            {editingTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg relative z-60 w-full max-w-xs sm:max-w-sm md:max-w-md">
                        <UpdateTodo
                            uid={uid}
                            tid={editingTask.tid}
                            initialTitle={editingTask.taskName}
                            initialDate={editingTask.date}
                            onCancel={handleCloseEdit}
                            onTaskUpdate={handleTaskUpdate}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
