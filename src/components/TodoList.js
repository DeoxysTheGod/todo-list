import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingTaskId: null
        };
    }

    handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('text/plain', taskId.toString());
    };

    handleDragOver = (e, targetTaskId) => {
        e.preventDefault();
        const sourceTaskId = parseInt(e.dataTransfer.getData('text/plain'));
        if (sourceTaskId !== targetTaskId) {
            const updatedTasks = this.reorderTasks(sourceTaskId, targetTaskId);
            this.setState({ tasks: updatedTasks });
        }
    };

    reorderTasks = (sourceTaskId, targetTaskId) => {
        const { tasks } = this.props;
        const updatedTasks = [...tasks];
        const sourceIndex = updatedTasks.findIndex(task => task.id === sourceTaskId);
        const targetIndex = updatedTasks.findIndex(task => task.id === targetTaskId);
        const [removedTask] = updatedTasks.splice(sourceIndex, 1);
        updatedTasks.splice(targetIndex, 0, removedTask);
        return updatedTasks;
    };



    handleDrop = (e, targetTaskId) => {
        e.preventDefault();
        const sourceTaskId = parseInt(e.dataTransfer.getData('text/plain'));
        if (sourceTaskId !== targetTaskId) {
            const updatedTasks = this.reorderTasks(sourceTaskId, targetTaskId);
            this.props.updateTasksOrder(updatedTasks);
        }
    };

    handleMoveUp = (taskId) => {
        const { tasks } = this.props;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex > 0) {
            const updatedTasks = [...tasks];
            const [removedTask] = updatedTasks.splice(taskIndex, 1);
            updatedTasks.splice(taskIndex - 1, 0, removedTask);
            this.props.updateTasksOrder(updatedTasks);
        }
    };

    handleMoveDown = (taskId) => {
        const { tasks } = this.props;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const [removedTask] = updatedTasks.splice(taskIndex, 1);
            updatedTasks.splice(taskIndex + 1, 0, removedTask);
            this.props.updateTasksOrder(updatedTasks);
        }
    };

    handleChange = (taskId) => {
        this.props.handleCheckboxChange(taskId);
    };

    handleDelete = (taskId) => {
        this.setState({ deletingTaskId: taskId });
        setTimeout(() => {
            this.props.handleDeleteTask(taskId);
            this.setState({ deletingTaskId: null });
        }, 290); // Temps de délai avant la suppression réelle
    };

    render() {
        const { tasks } = this.props;
        const { deletingTaskId } = this.state;

        return (
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li
                        key={task.id}
                        className={`${deletingTaskId === task.id ? 'deleting' : ''} todo-item`}
                        draggable={true}
                        onDragStart={(e) => this.handleDragStart(e, task.id)}
                        onDragOver={this.handleDragOver}
                        onDrop={(e) => this.handleDrop(e, task.id)}
                    >
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
                        <div className={"order-btn"}>
                            {index !== 0 && <button onClick={() => this.handleMoveUp(task.id)}>▲</button>}
                            {index !== tasks.length - 1 && <button onClick={() => this.handleMoveDown(task.id)}>▼</button>}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TodoList;
