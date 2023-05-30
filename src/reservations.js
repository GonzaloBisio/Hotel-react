import Navbar from './navbar/navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MyReservations() {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Verificar si hay un token almacenado en el almacenamiento local (localStorage)
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Redireccionar a la página de inicio de sesión si no hay token almacenado
      history.push('/login');
      return; // Detener la ejecución del useEffect si no hay token almacenado
    }
  
    // Realizar la solicitud GET a http://localhost:5000/my-reservations
    axios
      .get('http://localhost:5000/my-reservations', {
        headers: {
          Authorization: `Bearer ${storedToken}` // Utilizar storedToken en lugar de token
        }
      })
      .then(response => {
        // Manejar la respuesta de la solicitud
        setReservations(response.data['reservations']);
      })
      .catch(error => {
        // Manejar los errores de la solicitud
        console.error('Error al obtener las reservas:', error);
      });
  }, [token, history]);
  

  // Ordenar las reservas en orden descendente por reservation_id
  reservations.sort((a, b) => b.reservation_id - a.reservation_id);

  return (
    <>
    <Navbar/>
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
    </>
  );
}

export default MyReservations;
