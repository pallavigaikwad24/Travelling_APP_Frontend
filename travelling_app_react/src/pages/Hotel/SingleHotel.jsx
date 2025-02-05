import React from 'react';

const SingleHotel = () => {
    const hotel = {
        name: "Grand Ocean Resort & Spa",
        rating: 4.8,
        location: "Malibu, California",
        description: "Experience luxury beachfront living at its finest. Our resort offers stunning ocean views, world-class amenities, and exceptional service to make your stay unforgettable.",
        price: 299,
        images: [
            "/api/placeholder/800/500",
            "/api/placeholder/800/500",
            "/api/placeholder/800/500"
        ],
        amenities: [
            "Free WiFi",
            "Parking",
            "Restaurant",
            "Swimming Pool",
            "Coffee Shop"
        ]
    };

    return (
        <>
            <style>
                {`
          .hotel-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .hotel-header {
            margin-bottom: 32px;
          }

          .hotel-name {
            font-size: 2.5rem;
            margin-bottom: 12px;
            color: #2c3e50;
          }

          .hotel-meta {
            display: flex;
            gap: 20px;
            color: #666;
          }

          .rating {
            display: flex;
            align-items: center;
          }

          .star {
            color: #f1c40f;
            margin-right: 5px;
          }

          .gallery {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 32px;
          }

          @media (min-width: 768px) {
            .gallery {
              grid-template-columns: repeat(2, 1fr);
            }

            .main-image {
              grid-column: span 2;
            }
          }

          .gallery img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease;
          }

          .gallery img:hover {
            transform: scale(1.02);
          }

          .content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
          }

          @media (min-width: 992px) {
            .content-grid {
              grid-template-columns: 2fr 1fr;
            }
          }

          .info-card {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 24px;
          }

          .card-title {
            font-size: 1.5rem;
            margin-bottom: 16px;
            color: #2c3e50;
          }

          .description {
            line-height: 1.6;
            color: #666;
          }

          .amenities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }

          .amenity-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #666;
          }

          .booking-card {
            background: white;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            position: sticky;
            top: 24px;
          }

          .price {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 16px;
          }

          .per-night {
            font-size: 1rem;
            font-weight: normal;
            color: #666;
          }

          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-label {
            font-size: 0.9rem;
            color: #666;
          }

          .form-input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }

          .form-select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            width: 100%;
          }

          .book-button {
            width: 100%;
            padding: 14px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .book-button:hover {
            background: #2980b9;
          }

          .disclaimer {
            text-align: center;
            font-size: 0.9rem;
            color: #666;
            margin-top: 16px;
          }
        `}
            </style>

            <div className="hotel-container">
                <div className="hotel-header">
                    <h1 className="hotel-name">{hotel.name}</h1>
                    <div className="hotel-meta">
                        <div className="rating">
                            <span className="star">★</span>
                            <span>{hotel.rating}</span>
                        </div>
                        <div className="location">📍 {hotel.location}</div>
                    </div>
                </div>

                <div className="gallery">
                    <img src={hotel.images[0]} alt="Hotel main view" className="main-image" />
                    <img src={hotel.images[1]} alt="Hotel secondary view" />
                    <img src={hotel.images[2]} alt="Hotel tertiary view" />
                </div>

                <div className="content-grid">
                    <div className="main-content">
                        <div className="info-card">
                            <h2 className="card-title">About This Hotel</h2>
                            <p className="description">{hotel.description}</p>
                        </div>

                        <div className="info-card">
                            <h2 className="card-title">Amenities</h2>
                            <div className="amenities-grid">
                                {hotel.amenities.map((amenity, index) => (
                                    <div key={index} className="amenity-item">
                                        ✓ {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="booking-sidebar">
                        <div className="booking-card">
                            <div className="price">
                                ${hotel.price} <span className="per-night">per night</span>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Check-in</label>
                                    <input type="date" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Check-out</label>
                                    <input type="date" className="form-input" />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '16px' }}>
                                <label className="form-label">Guests</label>
                                <select className="form-select">
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                    <option>4 Guests</option>
                                </select>
                            </div>

                            <button className="book-button">Book Now</button>
                            <p className="disclaimer">You won't be charged yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleHotel;