import Navbar from './navbar/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ConfirmReservation() {
    const history = useHistory();
    const location = useLocation();
    const requestData = location.state && location.state.requestData;
    const [token, setToken] = useState('');

    useEffect(() => {
        // Verificar si hay un token almacenado en el almacenamiento local (localStorage)
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.log(requestData)
            // Redireccionar a la página de inicio de sesión si no hay token almacenado
            history.push('/login', { requestData });
        }
    }, [history, requestData]);

    const adjustedData = {
        hotel_id: parseInt(requestData.hotel_id),
        initial_date: requestData.initial_date,
        final_date: requestData.final_date
      };

    const handleConfirmReservation = () => {
        // Realizar la solicitud POST a http://localhost:5000/reservation
        axios.post('http://localhost:5000/reservation', adjustedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            // Manejar la respuesta de la solicitud
            console.log('Reserva confirmada:', response.data);
            // Redireccionar a /reservations
            history.push('/reservations');

        })
        .catch(error => {
            // Manejar los errores de la solicitud
            console.error('Error al confirmar la reserva:', error);
        });
    };

    return (
        <>
        <Navbar/>
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <h4>Confirmar Reserva</h4>
                        <p>Fecha Inicio: <b>{requestData.initial_date}</b></p>
                        <p>Fecha Final: <b>{requestData.final_date}</b></p>
                        <p>Hotel: <b>{requestData.hotel_id}</b></p>
                        <button className="waves-effect waves-light btn-large grey darken-3" onClick={handleConfirmReservation}>
                            Confirmar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmReservation;