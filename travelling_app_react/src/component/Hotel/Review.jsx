import { useState } from "react";
import "C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/review.css"; // Import CSS
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Review = ({ setShowAleart }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
    axios.defaults.withCredentials = true;
    const url = useSelector((state) => state.backendUrl.url);
    const { id } = useParams();
    console.log("Id::", id);

    const handleSubmit = (e) => {
        axios.post(`${url}/hotel/add-hotel-reviews/${id}`, { review: feedback, rating })
            .then((res) => console.log("Res 18:", res))
            .catch((err) => console.log(err))
        e.preventDefault();
        console.log("Submitted Rating:", rating);
        console.log("Feedback:", feedback);

        setRating(0);
        setFeedback("");
        setShowAleart(true);
    };

    return (
        <div className="feedback-container">
            <h2 className="review-title">Rate Your Experience</h2>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                        <span
                            key={index}
                            className={`star ${currentRating <= (hover || rating) ? "active" : ""}`}
                            onClick={() => setRating(currentRating)}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            ★
                        </span>
                    );
                })}
            </div>

            {/* Feedback Text Area */}
            <textarea
                className="feedback-text"
                placeholder="Share your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />

            {/* Submit Button */}
            <button className="submit-btn" onClick={handleSubmit} disabled={rating === 0 || !feedback}>
                Submit Feedback
            </button>
        </div>
    );
};

export default Review;
