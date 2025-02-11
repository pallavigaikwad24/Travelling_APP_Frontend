import axios from 'axios';
import { setFilters, setSearchQueryDestination, setSearchQueryDeparture } from '../../redux/features/search/searchFlightSlice';
import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';
import { useDispatch, useSelector } from 'react-redux';
import { setflightList, setIsflightList, setIsflightListTrue, setSearchflightInfo } from '../../redux/features/flight/flightSlice';
import { useState } from 'react';

const FlightSearch = () => {
    const filters = useSelector((state) => state?.searchFlight?.filters);
    const flights = useSelector((state) => state?.flight?.flightList);
    const isflightList = useSelector((state) => state.flight.isflightList);
    const searchFlightInfo = useSelector((state) => state.flight.searchflightInfo);
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.url);
    const today = new Date().toISOString().split('T')[0];
    const searchQueryDeparture = useSelector((state) => state.searchFlight.searchQueryDeparture);
    const searchQueryDestination = useSelector((state) => state.searchFlight.searchQueryDestination);
    const [showDepartureList, setShowDepartureList] = useState(false);
    const [showDestinationList, setShowDestinationList] = useState(false);
    const [error, setError] = useState(null);

    const handleDepartureSearchChange = (e) => {
        setShowDepartureList(true);
        setShowDestinationList(false);
        dispatch(setIsflightListTrue());

        dispatch(setSearchQueryDeparture(e.target.value));
        dispatch(setFilters({ ...filters, departure_airport: e.target.value }));

        axios.post(`${url}/search/flight-list`, { name: e.target.value })
            .then((response) => {
                dispatch(setflightList(response.data));
            })
            .catch((err) => console.log("Error 33:", err));
    }
    const handleDestinationSearchChange = (e) => {
        setShowDestinationList(true);
        setShowDepartureList(false);
        dispatch(setIsflightListTrue());

        dispatch(setSearchQueryDestination(e.target.value));
        dispatch(setFilters({ ...filters, destination_airport: e.target.value }));

        axios.post(`${url}/search/flight-list`, { name: e.target.value })
            .then((response) => {
                dispatch(setflightList(response.data));
            })
            .catch((err) => console.log("Error 47:", err));
    }

    const handleDepartureflightList = (name, city, country, icao_code) => {
        dispatch(setSearchQueryDeparture(`${name},(${icao_code}) ${city}, ${country}`));
        dispatch(setFilters({ ...filters, departure_airport: icao_code }));
        dispatch(setIsflightList());
    }
    const handleDestinationflightList = (name, city, country, icao_code) => {
        dispatch(setSearchQueryDestination(`${name},(${icao_code}) ${city}, ${country}`));
        dispatch(setFilters({ ...filters, destination_airport: icao_code }));
        dispatch(setIsflightList());
    }

    const handleSearch = (e) => {
        console.log("Filters:", filters);
        e.preventDefault();
        const obj = {
            departure_airport: filters.departure_airport,
            destination_airport: filters.destination_airport,
            start_date: filters.startDate,
            total_seats: Number(filters.total_seats)
        }

        axios.post(`${url}/search/flights`, obj)
            .then((response) => {
                setError(null);
                dispatch(setSearchflightInfo(response.data));
            })
            .catch((err) => {
                if (err.status == 403) {
                    setError(err.response.data[0].msg);
                }
            })
    };


    return (
        <>
            {/* Search Bar */}
            <div className="search-container">
                <form className="search-bar flight">
                    <div className="search-bar-div">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            name='search'
                            placeholder="Departure Airport"
                            value={searchQueryDeparture}
                            onChange={(e) => handleDepartureSearchChange(e)}
                        />
                        {
                            flights && showDepartureList && isflightList && (
                                <div className="location-options">
                                    <div className="option-card">
                                        {
                                            flights && flights.map((flight, index) => (
                                                <div className="search-option" key={index}
                                                    onClick={() => handleDepartureflightList(flight.name, flight.city, flight.country, flight.icao_code)}>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <div className="text">
                                                        <div className="location">{`${flight.name}, (${flight.icao_code})`}</div>
                                                        <div className="country">{`${flight.city}, ${flight.country}`}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form >
                <form className="search-bar flight">
                    <div className="search-bar-div">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            name='search'
                            placeholder="Destination Airport"
                            value={searchQueryDestination}
                            onChange={(e) => handleDestinationSearchChange(e)}
                        />
                        {
                            flights && showDestinationList && isflightList && (
                                <div className="location-options">
                                    <div className="option-card">
                                        {
                                            flights && flights.map((flight, index) => (
                                                <div className="search-option" key={index}
                                                    onClick={() => handleDestinationflightList(flight.name, flight.city, flight.country, flight.icao_code)}>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    <div className="text">
                                                        <div className="location">{`${flight.name}, (${flight.icao_code})`}</div>
                                                        <div className="country">{`${flight.city}, ${flight.country}`}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>


                {/* Filters */}
                <div className="filters" >
                    <div className="filter date">
                        <input
                            type="date"
                            value={filters?.startDate}
                            onChange={(e) => dispatch(setFilters({ ...filters, startDate: e.target.value }))}
                            min={today}
                        />
                    </div>
                    <div className="filter users">
                        <i className="fa-solid fa-users"></i>
                        <input
                            type="number"
                            placeholder="Travelers"
                            value={filters?.total_seats}
                            onChange={(e) => dispatch(setFilters({ ...filters, total_seats: e.target.value }))}
                            min={1}
                        />
                    </div>
                    <button type="submit" onClick={handleSearch}> Search</button>
                </div>
            </div >

            {/* Destination List */}
            <div className="destination-list">
                {
                    error ? <h2 style={{ "color": "red" }}>{error}</h2> : <h2>Flights</h2>
                }

                <div className="destinations">
                    {/* Example Destination Card */}
                    {
                        searchFlightInfo && searchFlightInfo.map((flight, index) => (
                            <div className="destination-card" key={index}>
                                <div className="card-header">
                                    <h3>{flight.airline}</h3>
                                </div>
                                <div className="card-body">
                                    <p><strong>✈️ Airline:</strong> {flight.airline}</p>
                                    <p><strong>📍 Departure:</strong> {flight.departure_airport}</p>
                                    <p><strong>📍 Arrival:</strong> {flight.arrival_airport}</p>
                                    <p><strong>📅 Date:</strong> {flight.departure_date}</p>
                                    <p><strong>⏰ Time:</strong> {flight.departure_time}</p>
                                    <p className="price"><strong>💰 Price:</strong> ${flight.price}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </>
    );
};

export default FlightSearch;