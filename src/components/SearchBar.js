import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        };
    }

    handleSearch = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });

        if (searchTerm.length < 3) {
            this.props.onSearch('');
            return;
        }

        this.props.onSearch(searchTerm);
    };

    render() {
        const { searchTerm } = this.state;
        const inputClass = searchTerm.length >= 3 ? 'search-input active' : 'search-input';

        return (
            <input
                type="text"
                className={inputClass}
                placeholder="Recherche rapide..."
                value={this.state.searchTerm}
                onChange={this.handleSearch}
            />
        );
    }
}

export default SearchBar;