import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { setAllHotelInfo } from "../../redux/features/hotel/hotelSlice";

const Destinations = () => {
    const allHotelInfo = useSelector((state) => state.hotel.allHotelInfo);
    const userInfo = useSelector((state) => state.login.userInfo);
    const url = useSelector((state) => state.backendUrl.url);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${url}/hotel/get-all-hotels`)
            .then((response) => {
                console.log("Res 14:", response.data);
                dispatch(setAllHotelInfo(response.data));
            })
            .catch((err) => {
                console.log(err);
                if (err.status == 401) {
                    navigate("/login");
                    localStorage.removeItem("user_login");
                }
            })
    }, [url, navigate, dispatch])

    return (
        <section className="destinations" id="destinations">
            <h2>Featured Hotels</h2>
            <div className="destination-list-home">

                {
                    allHotelInfo &&
                    allHotelInfo.map((hotel) => {
                        if (hotel.ReviewHotelModels.some((review, index) => review.rating === 5 && index <= 2)) {

                            return <div key={hotel.id} className="destination-card" >
                                <img src={`${url}/hotelPictures/upload/${userInfo?.id}/${hotel.id}/${JSON.parse(hotel?.images)[0]}`} alt={hotel?.name}
                                    onError={(e) => e.target.src = `${url}/hotelPictures/defaultImg/default_location.png`} />
                                <h3>{hotel?.name}</h3>
                                <p>📍{hotel?.country}</p>
                                <p>
                                    {[...Array(5)].map((_, index) => (
                                        <span key={index} style={{ "color": "#e4d05d", "marginLeft": "5px" }}><i className="fa-solid fa-star"></i></span>
                                    ))}
                                </p>
                                {/* <button className="card-button" onClick={() => navigate(`/hotelname/${hotel?.id}`, { state: { hotel } })}>See More</button> */}
                            </div>
                        }
                    })}
            </div>
        </section >
    );
};

export default Destinations;