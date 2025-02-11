import React, { useState } from "react";
import AddTodo from "./addtodo";

const AddTaskButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleAddTask = (title, date) => {
        console.log("Task Added:", { title, date });
        handleClose();
    };

    return (
        <div className="flex justify-center items-center h-40">
            <button
                onClick={handleOpen}
                className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md"
            >
                <i className="fas fa-plus mr-2"></i> Add Task
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <AddTodo onCancel={handleClose} onAdd={handleAddTask} />
                </div>
            )}
        </div>
    );
};

export default AddTaskButton;
