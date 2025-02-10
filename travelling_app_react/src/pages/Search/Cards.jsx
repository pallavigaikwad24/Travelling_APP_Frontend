import { useSelector } from "react-redux";

const Cards = ({ image, title, description, buttonText }) => {
    const url = useSelector((state) => state.backendUrl.url);
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" onError={(e) => e.target.src = `${url}/hotelPictures/defaultImg/default_location.png`} />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <button className="card-button">{buttonText}</button>
            </div>
        </div>
    );
};

export default Cards;