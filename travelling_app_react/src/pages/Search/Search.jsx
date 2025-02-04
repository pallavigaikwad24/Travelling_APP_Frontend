import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/search.css';
import HotelSearch from './HotelSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOptionSelect } from '../../redux/features/searchHotel/searchHotelSlice';
import FlightSearch from './FlightSearch';

const Search = () => {

    const isOptionSelect = useSelector((state) => state.searchHotel.isOptionSelect);
    const dispatch = useDispatch();

    const handleSelectOption = (name) => {
        dispatch(setIsOptionSelect(name))
    }

    return (
        <div className="search-page">
            {/* Header */}
            <header>
                <h1>Travelista Tours</h1>
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