import axios from 'axios';
import { useState, useEffect } from 'react';
import M from 'materialize-css';

function HotelPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/hotel')
      .then(response => {
        const updatedHotels = response.data.hotels.map(hotel => ({
          ...hotel,
          images: hotel.images.map(image => `http://localhost:8000/${image}`)
        }));
        setHotels(updatedHotels);
        M.AutoInit();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Hoteles</h1>
      {hotels.map(hotel => (
        <div className="card" key={hotel.id}>
          <div className="card-image">
            <img src={hotel.images[0]} alt="Hotel" />
            <span className="card-title">{hotel.name}</span>
          </div>
          <div className="card-content">
            <p>{hotel.description}</p>
            <ul>
              {hotel.amenities.map(amenity => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HotelPage;
