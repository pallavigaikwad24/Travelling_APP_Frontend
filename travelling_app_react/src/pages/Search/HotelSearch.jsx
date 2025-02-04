import axios from 'axios';
import { setFilters, setSearchQuery } from '../../redux/features/searchHotel/searchHotelSlice';
import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelList, setIsHotelList, setSearchHotelInfo } from '../../redux/features/hotel/hotelSlice';

const HotelSearch = () => {

    const searchQuery = useSelector((state) => state.searchHotel.searchQuery);
    const filters = useSelector((state) => state.searchHotel.filters);
    const hotels = useSelector((state) => state.hotel.hotelList);
    const isHotelList = useSelector((state) => state.hotel.isHotelList);
    const searchHotelInfo = useSelector((state) => state.hotel.searchHotelInfo);
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.url);

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));

        axios.post(`${url}/search/hotel-list`, { name: e.target.value })
            .then((response) => {
                console.log(response.data);
                dispatch(setHotelList(response.data));
            })
            .catch((err) => console.log(err));
    }

    const handleHotelList = (name, location, country) => {
        dispatch(setSearchQuery(`${name}, ${location}, ${country}`));
        dispatch(setFilters({ ...filters, search: location }));
        dispatch(setIsHotelList());
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const obj = {
            name: filters.search,
            start_date: filters.startDate,
            end_date: filters.endDate,
            rooms: filters.travelers
        }
        axios.post(`${url}/search/hotels`, obj)
            .then((response) => {
                dispatch(setSearchHotelInfo(response.data));
            })
            .catch((err) => console.log(err))



    };


    return (
        <>
            {/* Search Bar */}
            <div className="search-container">
                <form className="search-bar">
                    <div className="search-bar-div">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            name='search'
                            placeholder="Where do you want to go?"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e)}
                        />
                        {
                            hotels && isHotelList &&
                            <div className="location-options">
                                <div className="option-card">
                                    {
                                        hotels && hotels.map((hotel, index) => (
                                            <div className="search-option" key={index}
                                                onClick={() => handleHotelList(hotel.name, hotel.location.split(",")[0], hotel.country)}>
                                                <i className="fa-solid fa-location-dot"></i>
                                                <div className="text">
                                                    <div className="location">{hotel.name}</div>
                                                    <div className="country">{`${hotel.location.split(",")[0]}, ${hotel.country}`}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </form>


                {/* Filters */}
                <div className="filters" >
                    <div className="filter date">

                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => dispatch(setFilters({ ...filters, startDate: e.target.value }))}
                        />
                    </div>
                    <div className="filter date">
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => dispatch(setFilters({ ...filters, endDate: e.target.value }))}
                        />
                    </div>
                    <div className="filter users">
                        <i className="fa-solid fa-users"></i>
                        <input
                            type="number"
                            placeholder="Travelers"
                            value={filters.travelers}
                            onChange={(e) => dispatch(setFilters({ ...filters, travelers: e.target.value }))}
                        />
                    </div>
                    <button type="submit" onClick={handleSearch}> Search</button>
                </div>
            </div>

            {/* Destination List */}
            <div className="destination-list">
                <h2>Popular Destinations</h2>
                <div className="destinations">
                    {/* Example Destination Card */}
                    {
                        searchHotelInfo && searchHotelInfo.map((hotel, index) => (
                            <div className="destination-card" key={index}>
                                <img src={`${url}/hotelPictures/defaultImg/default_location.png`} alt="Destination" />
                                <h3>{hotel.country}</h3>
                                <p>{hotel.name}</p>
                                <button>
                                    Explore
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export default HotelSearch;