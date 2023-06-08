import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function AmenitiesPage() {
  const history = useHistory();
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    axios.get('http://localhost:5000/amenitie', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
      .then(response => {
        setAmenities(response.data.amenities);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [history]);

  const handleCreateAmenity = () => {
    history.push('/admin/amenities/crear');
  };

  return (
    <>
    <Navbar/>
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="col s10">
              <h4>Amenities</h4>
            </div>
            <div className="col s2">
              <button
                className="btn waves-effect waves-light grey darken-3 right"
                onClick={handleCreateAmenity}>
                Crear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {amenities.map(amenity => (
                  <tr key={amenity.id}>
                    <td>{amenity.id}</td>
                    <td>{amenity.name}</td>
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

export default AmenitiesPage;
