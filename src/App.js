import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isModalOpen: false,
            newTaskTitle: ""
        };
    }

    componentDidMount() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.setState({ tasks: JSON.parse(storedTasks) });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tasks !== this.state.tasks) {
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        }
    }

    handleAddTask = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleAddNewTask = () => {
        const { newTaskTitle, tasks } = this.state;
        if (newTaskTitle.trim() !== "") {
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                isChecked: false
            };
            this.setState({
                tasks: [...tasks, newTask],
                newTaskTitle: "",
                isModalOpen: false
            });
        }
    };

    handleDeleteTask = (taskId) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== taskId)
        }));
    };

    handleCheckboxChange = (taskId) => {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, isChecked: !task.isChecked };
                }
                return task;
            })
        }));
    };

    render() {
        const { tasks, isModalOpen, newTaskTitle } = this.state;

        return (
            <div className="app">
                <Header remainingTasks={tasks.filter(task => !task.isChecked).length} totalTasks={tasks.length} />
                <TodoList tasks={tasks} handleCheckboxChange={this.handleCheckboxChange} handleDeleteTask={this.handleDeleteTask}/>
                <Footer handleAddTask={this.handleAddTask} />
                <Modal isOpen={isModalOpen} handleClose={this.handleCloseModal}>
                    <input type="text" placeholder={"Ma tâche est ..."} value={newTaskTitle} onChange={(e) => this.setState({ newTaskTitle: e.target.value })} />
                    <button onClick={this.handleAddNewTask}>Ajouter</button>
                </Modal>
            </div>
        );
    }
}

export default App;
