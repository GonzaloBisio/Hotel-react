// MyReservations.jsx

import Navbar from './navbar/navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import M from 'materialize-css';

function MyReservations() {
  const history = useHistory();
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [token, setToken] = useState('');
  const [hotels, setHotels] = useState([]);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en el almacenamiento local (localStorage)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redireccionar a la página de inicio de sesión si no hay token almacenado
      history.push('/login');
    }

    if (location.state && location.state.newReservation && !reservationConfirmed) {
      M.toast({ html: '¡Reserva confirmada exitosamente!', classes: 'green' });
      setReservationConfirmed(true);
    }

    // Realizar la solicitud GET a http://localhost:5000/hotel
    axios
      .get('http://localhost:5000/hotel')
      .then(response => {
        const updatedHotels = response.data.hotels.map(hotel => ({
          ...hotel,
          images: hotel.images.map(image => `http://localhost:8000/${image}`)
        }));
        setHotels(updatedHotels);
        // Inicializar nuevamente el componente select
        M.AutoInit();
        const elems = document.querySelectorAll('.datepicker');
        const options = {
          format: 'dd/mm/yyyy'
        };
        M.Datepicker.init(elems, options);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = {};

    // Verificar si existen los query params y agregarlos al objeto params
    if (urlSearchParams.has('hotel_id')) {
      params.hotel_id = urlSearchParams.get('hotel_id');
    }
    if (urlSearchParams.has('date')) {
      params.date = urlSearchParams.get('date');
    }

    // Realizar la solicitud GET a http://localhost:5000/my-reservations
    axios
      .get('http://localhost:5000/my-reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: params
      })
      .then(response => {
        setReservations(response.data['reservations']);
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
      });
  }, [history, location, token, setReservationConfirmed, reservationConfirmed]);

  // Ordenar las reservas en orden descendente por reservation_id
  reservations.sort((a, b) => b.reservation_id - a.reservation_id);

  return (
    <>
      <Navbar />

      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <form>
              <div className="row">
                <div className="input-field col s12 m6">
                  <select className="icons" name="hotel_id" required defaultValue="0">
                    <option name="hotel_id" value="" disabled>
                      Elije Hotel a Reservar
                    </option>
                    {hotels.map(hotel => (
                      <option name="hotel_id" key={hotel.id} value={hotel.id} data-icon={hotel.images[0]}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                  <label>Hotel</label>
                </div>
                <div className="col s12 m4">
                  <div className="grey-text">Fecha a Buscar</div>
                  <input name="date" type="text" className="datepicker" />
                </div>

                <div className="col s12 m2">
                  <button className="btn-large waves-effect waves-light grey darken-3" type="submit">
                    Filtrar
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
            <div className="container">
              <h2>Mis Reservas</h2>
              <table>
                <thead>
                  <tr>
                    <th>Reservation ID</th>
                    <th>Nombre</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation.reservation_id}>
                      <td>{reservation.reservation_id}</td>
                      <td>{reservation.hotel_name}</td>
                      <td>{reservation.initial_date}</td>
                      <td>{reservation.final_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyReservations;
