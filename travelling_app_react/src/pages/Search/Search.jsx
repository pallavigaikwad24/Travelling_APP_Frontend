import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';
import HotelSearch from './HotelSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOptionSelect } from '../../redux/features/searchHotel/searchHotelSlice';
import FlightSearch from './FlightSearch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/protectedRoute/protectedRouteSlice';

const Search = () => {

    const isOptionSelect = useSelector((state) => state.searchHotel.isOptionSelect);
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.url);
    const navigate = useNavigate();
    
    const handleSelectOption = (name) => {
        dispatch(setIsOptionSelect(name))
    }

    const handleLogout = () => {
        axios.get(`${url}/user/logout`).then(() => navigate("/login")).catch((err) => console.log(err));
        dispatch(logout());
    }

    return (
        <div className="search-page">
            {/* Header */}
            <header className='header-search'>
                <h1>Travelista Tours</h1>
                <div className='logout' onClick={handleLogout}>Logout</div>
                <div className="travel-option">
                    <div className="hotel" onClick={() => handleSelectOption("hotel")}>
                        <i className="fa-solid fa-hotel" name="hotel"></i>
                        <label htmlFor="hotel">Stay</label>
                    </div>
                    <div className="flight" onClick={() => handleSelectOption("flight")}>
                        <i className="fa-solid fa-plane" name="flight"></i>
                        <label htmlFor="flight">Flight</label>
                    </div>
                </div>
            </header>
            {
                isOptionSelect && isOptionSelect == "hotel" ? <HotelSearch /> : <FlightSearch />
            }
        </div>
    );
};

export default Search;