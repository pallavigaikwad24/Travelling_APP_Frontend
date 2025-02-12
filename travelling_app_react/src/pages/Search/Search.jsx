import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';
import HotelSearch from './HotelSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOptionSelect } from '../../redux/features/search/searchHotelSlice';
import FlightSearch from './FlightSearch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/protectedRoute/protectedRouteSlice';
import { useState } from 'react';
import HotelForm from '../../component/Hotel/HotelForm';

const Search = () => {

    const isOptionSelect = useSelector((state) => state.searchHotel.isOptionSelect);
    const dispatch = useDispatch();
    const url = useSelector((state) => state.backendUrl.url);
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.login.userInfo);
    const [showForm, setShowForm] = useState(false);

    const handleSelectOption = (name) => {
        dispatch(setIsOptionSelect(name))
    }

    const handleLogout = () => {
        axios.get(`${url}/user/logout`).then(() => navigate("/login")).catch((err) => {
            console.log(err);
            if (err.status == 401) localStorage.removeItem("user_login");
        });
        dispatch(logout());
    }

    const handleList = () => {
        console.log("Userinfo:", userInfo);
        if (!userInfo) {
            localStorage.removeItem("user_login");
            navigate("/login");
        };
        if (userInfo.user_type != 'admin')
            navigate("/signup");
        else {
            setShowForm(true);
        }
    }

    const onClse = () => {
        setShowForm(false)
    }

    return (
        <div className="search-page">
            {/* Header */}
            <header className='header-search'>
                <h1>Travelista Tours</h1>
                <div className="optionDiv">
                    {
                        isOptionSelect == "hotel" &&
                        <div className='list' onClick={handleList}>List your property</div>
                    }
                    <div className='logout' onClick={handleLogout}>Logout</div>
                </div>
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

            {
                showForm &&
                <div className="hotelFormDiv">
                    <HotelForm onClose={onClse} />
                </div>
            }
        </div>
    );
};

export default Search;