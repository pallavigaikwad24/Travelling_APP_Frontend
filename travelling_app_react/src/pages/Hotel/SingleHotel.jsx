import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../assets/style/singleHotel.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelInfo } from '../../redux/features/hotel/hotelSlice';
import { useEffect, useState } from 'react';
import Payment from '../Payment_gateway/Payment';
import Review from '../../component/Hotel/Review';

const SingleHotel = () => {
  const { id } = useParams();
  const hotelInfo = useSelector((state) => state.hotel.hotelInfo);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.backendUrl.url);
  const location = useLocation();
  const { info } = location.state || {};
  axios.defaults.withCredentials = true;

  const [showAlert, setShowAleart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/hotel/${id}`)
      .then((response) => dispatch(setHotelInfo(response.data)))
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          navigate("/login");
          localStorage.removeItem("user_login");
        }
      });
  }, [dispatch, id, url, navigate]);

  console.log("response:", hotelInfo);

  return (
    <>
      {
        hotelInfo &&
        <div className="hotel-container">
          <div className="hotel-header">
            <h1 className="hotel-name">{hotelInfo.name}</h1>
            <div className="hotel-meta">
              <div className="rating">
                <span className="star">★</span>
                <span>{hotelInfo?.ReviewHotelModel?.rating}</span>
              </div>
              <div className="location">📍 {hotelInfo.location}</div>
            </div>
          </div>

          <div className="gallery">
            {
              hotelInfo.images && JSON.parse(hotelInfo.images).map((image, index) => (
                <div key={index}>
                  <img src={image[index]} alt="Hotel main view" className="main-image" onError={(e) => e.target.src = `${url}/hotelPictures/defaultImg/default_location.png`} />
                </div>
              ))
            }
          </div>

          <div className="content-grid">
            <div className="main-content">
              <div className="info-card">
                <h2 className="card-title">About This Hotel</h2>
                {/* <p className="description">{hotelInfo.description}</p> */}
                <p className="description">Situated in Sonīpat, 35 km from Red Fort, NAAD WELLNESS features
                  accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden.
                  Among the facilities of this property are a restaurant, room service and a 24-hour front desk,
                  along with free WiFi. Jantar Mantar is 37 km from the resort and Feroz Shah Kotla Cricket
                  Stadium is 37 km away.
                </p>
              </div>

              <div className="info-card">
                <h2 className="card-title">Amenities</h2>
                <div className="amenities-grid">
                  {JSON.parse(hotelInfo.services).map((service, index) => (
                    <div key={index} className="amenity-item">
                      ✓ {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="booking-sidebar">
              <div className="booking-card">
                <div className="price">
                  ₹{hotelInfo.price_per_night} <span className="per-night">per night</span>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Check-in</label>
                    <input type="date" className="form-input" value={info.startDate} disabled />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out</label>
                    <input type="date" className="form-input" value={info.endDate} disabled />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Guests</label>
                  <select className="form-select" disabled>
                    <option>{info.travelers} Guest</option>
                  </select>
                </div>
                <Payment amount={hotelInfo.price_per_night * info.travelers} hotel_id={hotelInfo.id} check_in_date={info.startDate} check_out_date={info.endDate} number_of_rooms={info.travelers} btnName={"Book Hotel"} />
                <p className="disclaimer">You won't be charged yet</p>
              </div>
            </div>
          </div>
          {
            showAlert &&
            <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
              <strong> Thank you for your feedback!.</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAleart(false)}></button>
            </div>
          }
          <Review setShowAleart={setShowAleart} />
        </div>
      }
    </>
  );
};

export default SingleHotel;