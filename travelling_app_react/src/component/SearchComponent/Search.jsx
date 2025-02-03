import { useState } from 'react';
import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        startDate: '',
        endDate: '',
        travelers: 0,
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setFilters({ ...filters, search: e.target.value })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery, filters);
    };

    return (
        <div className="search-page">
            {/* Header */}
            <header>
                <h1>Travelista Tours</h1>
                <div className="travel-option">
                    <div className="hotel">
                        <i className="fa-solid fa-hotel" name="hotel"></i>
                        <label htmlFor="hotel">Stay</label>
                    </div>
                    <div className="flight">
                        <i className="fa-solid fa-plane" name="flight"></i>
                        <label htmlFor="flight">Flight</label>
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="search-container">
                <form className="search-bar">
                    <div className="search-bar-div">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        {/* <FontAwesomeIcon icon={faSearch} /> */}
                        <input
                            type="text"
                            name='search'
                            placeholder="Where do you want to go?"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e)}
                        />
                        {/* <button type="submit"> Search</button> */}
                    </div>
                </form>

                {/* Filters */}
                <div className="filters" >
                    <div className="filter date">
                        
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        />
                    </div>
                    <div className="filter date">
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        />
                    </div>
                    <div className="filter users">
                        <i className="fa-solid fa-users"></i>
                        <input
                            type="number"
                            placeholder="Travelers"
                            value={filters.travelers}
                            onChange={(e) => setFilters({ ...filters, travelers: e.target.value })}
                        />
                    </div>
                    {/* <button> <i className="fa-solid fa-sliders"></i></button> */}
                    <button type="submit" onClick={handleSearch}> Search</button>
                </div>
            </div>

            {/* Destination List */}
            <div className="destination-list">
                <h2>Popular Destinations</h2>
                <div className="destinations">
                    {/* Example Destination Card */}
                    <div className="destination-card">
                        <img src="https://via.placeholder.com/200x150" alt="Destination" />
                        <h3>Paris</h3>
                        <p>City of Lights</p>
                        <button>
                            Explore
                        </button>
                    </div>
                    {/* Add more destination cards here */}
                </div>
            </div>
        </div>
    );
};

export default Search;