import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddNewTask = () => {
        if (newTaskTitle.trim() !== "") {
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                isChecked: false
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle("");
            setIsModalOpen(false);
        }
    };

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, isChecked: !task.isChecked };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="app">
            <Header remainingTasks={tasks.filter(task => !task.isChecked).length} totalTasks={tasks.length} />
            <TodoList tasks={tasks} handleCheckboxChange={handleCheckboxChange} />
            <Footer handleAddTask={handleAddTask} />
            <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
                <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                <button onClick={handleAddNewTask}>Ajouter</button>
            </Modal>
        </div>
    );
};

export default App;
