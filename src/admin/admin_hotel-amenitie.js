import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function HotelAmenitiesPage() {
  const history = useHistory();
  const [hotelAmenities, setHotelAmenities] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    axios.get('http://localhost:5000/hotel_amenitie', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
      .then(response => {
        setHotelAmenities(response.data.hotel_amenitie);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [history]);

  const handleCreateAmenity = () => {
    history.push('/admin/hotel_amenitie/crear');
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="col s10">
              <h4>Amenities y Hoteles</h4>
            </div>
            <div className="col s2">
              <button
                className="btn waves-effect waves-light grey darken-3 right"
                onClick={handleCreateAmenity}
              >
                Crear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID Hotel</th>
                  <th>Hotel</th>
                  <th>ID Amenitie</th>
                  <th>Amenitie</th>
                </tr>
              </thead>
              <tbody>
                {hotelAmenities.map(item => (
                  <tr key={`${item.hotel_id}${item.amenitie_id}`}>
                    <td>{item.hotel_id}</td>
                    <td>{item.hotel_name}</td>
                    <td>{item.amenitie_id}</td>
                    <td>{item.amenitie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelAmenitiesPage;
