import React from 'react';
import './TodoList.css';

const TodoList = ({ tasks, handleCheckboxChange }) => {
    const handleChange = (taskId) => {
        handleCheckboxChange(taskId);
    };

    return (
        <ul className="todo-list">
            {tasks.map(task => (
                <li key={task.id} className="todo-item">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            className="checkbox-input"
                            checked={task.isChecked}
                            onChange={() => handleChange(task.id)}
                        />
                        <span className="checkbox-custom"></span>
                    </label>
                    <span className={task.isChecked ? "task-title checked" : "task-title"}>{task.title}</span>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
