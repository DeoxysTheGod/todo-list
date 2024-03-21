import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        const { remainingTasks, totalTasks } = this.props;
        return (
            <header>
                <h1>Ma liste de tâches</h1>
                <p>{remainingTasks} tâches restantes sur {totalTasks} tâches</p>
            </header>
        );
    }
}

export default Header;
