import React from 'react';
import './Header.css';

const Header = ({ remainingTasks, totalTasks }) => {
    return (
        <header>
            <h1>Ma liste de tâches</h1>
            <p>{remainingTasks} tâches restantes sur {totalTasks} tâches</p>
        </header>
    );
};

export default Header;