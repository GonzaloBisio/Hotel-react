import axios from 'axios';
import { useEffect, useState } from 'react';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Realizar la solicitud GET a http://localhost:8000/my-reservations
    axios.get('http://localhost:8000/my-reservations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta de la solicitud
        setReservations(response.data);
      })
      .catch(error => {
        // Manejar los errores de la solicitud
        console.error('Error al obtener las reservas:', error);
      });
  }, [token]);

  // Ordenar las reservas en orden descendente por reservation_id
  reservations.sort((a, b) => b.reservation_id - a.reservation_id);

  return (
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
              <td>{reservation.name}</td>
              <td>{reservation.initial_date}</td>
              <td>{reservation.final_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyReservations;
