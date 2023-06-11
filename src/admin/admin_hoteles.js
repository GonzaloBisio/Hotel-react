import Navbar from '../navbar/navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

function AdminHotels() {
  const history = useHistory();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    axios.get('http://localhost:5000/hotel', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
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
  }, [history]);

  const handleCreateHotel = () => {
    history.push('/admin/hoteles/crear');
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="col s10">
              <h4>Hoteles</h4>
            </div>
            <div className="col s2">
              <button
                className="btn waves-effect waves-light grey darken-3 right"
                onClick={handleCreateHotel}>
                Crear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Habitaciones Totales</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map(hotel => (
                  <tr key={hotel.id}>
                    <td>{hotel.id}</td>
                    <td>
                        {hotel.name}
                    </td>
                    <td>{hotel.rooms_available}</td>
                    <td>{hotel.description}</td>
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

export default AdminHotels;
