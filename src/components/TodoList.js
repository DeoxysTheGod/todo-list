import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingTaskId: null
        };
    }

    handleChange = (taskId) => {
        this.props.handleCheckboxChange(taskId);
    };

    handleDelete = (taskId) => {
        this.setState({ deletingTaskId: taskId });
        setTimeout(() => {
            this.props.handleDeleteTask(taskId);
            this.setState({ deletingTaskId: null });
        }, 300); // Temps de délai avant la suppression réelle
    };

    render() {
        const { tasks } = this.props;
        const { deletingTaskId } = this.state;

        return (
            <ul className="todo-list">
                {tasks.map(task => (
                    <li key={task.id} className={`${deletingTaskId === task.id ? 'deleting' : ''} todo-item`}>
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={task.isChecked}
                                onChange={() => this.handleChange(task.id)}
                            />
                            <span className="checkbox-custom"></span>
                        </label>
                        <span className={task.isChecked ? "task-title checked" : "task-title"}>{task.title}</span>
                        <button className="delete-button" onClick={() => this.handleDelete(task.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m4 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoList;
