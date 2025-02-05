
const Destinations = () => {
    const destinations = [
        { id: 1, name: 'Paris', image: 'default_location.png', description: 'The City of Love' },
        { id: 2, name: 'Tokyo', image: 'default_location.png', description: 'The Capital of Japan' },
        { id: 3, name: 'New York', image: 'default_location.png', description: 'The Big Apple' },
    ];

    return (
        <section className="destinations">
            <h2>Featured Destinations</h2>
            <div className="destination-list">
                {destinations.map(destination => (
                    <div key={destination.id} className="destination-card">
                        <img src={`../../assets/images/${destination.image}`} alt={destination.name} />
                        <h3>{destination.name}</h3>
                        <p>{destination.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Destinations;