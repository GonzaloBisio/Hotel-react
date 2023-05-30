import Navbar from './navbar/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';


function ReservationPage() {
    const [availableRooms, setAvailableRooms] = useState(0);
    const [hotels, setHotels] = useState([]);
    const [requestData, setRequestData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Realizar la solicitud GET a http://localhost:5000/hotel
        axios.get('http://localhost:5000/hotel')
            .then(response => {
                const updatedHotels = response.data.hotels.map(hotel => ({
                    ...hotel,
                    images: hotel.images.map(image => `http://localhost:8000/${image}`)
                  }));
                setHotels(updatedHotels);
                // Inicializar nuevamente el componente select
                M.AutoInit();
                var elems = document.querySelectorAll('.datepicker');
                var options = {
                    format: 'dd/mm/yyyy',
                };
                M.Datepicker.init(elems, options);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const parseDate = (dateString) => {
        const parts = dateString.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
      
        const hotel_id = formData.get('hotel_id');
        const initialDate = formData.get('initial_date');
        const finalDate = formData.get('final_date');
      
        // Verificar si initialDate es anterior a finalDate
        const initialDateObj = new Date(parseDate(initialDate));
        const finalDateObj = new Date(parseDate(finalDate));
        if (initialDateObj >= finalDateObj) {
          // Mostrar un mensaje de error o realizar alguna acción adicional
          alert('La fecha inicial debe ser anterior a la fecha final');
          return;
        }
      
        const requestData = {
          hotel_id: hotel_id,
          initial_date: initialDate,
          final_date: finalDate,
        };
      
        // Establece los datos del formulario en el estado
        setRequestData(requestData);
      
        // Realizar la solicitud a la API
        axios
          .get('http://localhost:5000/rooms-available', {
            params: requestData
          })
          .then(response => {
            console.log(response);
            setAvailableRooms(response.data.rooms_available);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
      

    const handleReservationClick = () => {
        history.push('/confirm-reservation', { requestData });
    };

    return (
        <>
        <Navbar />
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <form onSubmit={handleSubmit}>
                            <h4>Buscar Hotel</h4>
                            <div className="row">
                                <div className="input-field col s12 m4">
                                    <select className="icons" name="hotel_id" required defaultValue="0">
                                        <option name="hotel_id" value="0" disabled >Elije Hotel a Reservar</option>
                                        {hotels.map(hotel => (
                                            <option name="hotel_id" key={hotel.id} value={hotel.id} data-icon={hotel.images[0]}>
                                                {hotel.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label>Hotel</label>
                                </div>
                                <div className="col s12 m4">
                                    <div className='grey-text'>Fecha Inicio</div>
                                    <input name="initial_date" type="text" className="datepicker" required />
                                </div>
                                <div className="col s12 m4">
                                    <div className='grey-text'>Fecha Final</div>
                                    <input name="final_date" type="text" className="datepicker" required />
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light grey darken-3 left" type="submit" name="action">
                                    Ver Disponibilidad
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                    <ul className="collection with-header">
                        <li className="collection-header">
                            <h4>Habitaciones Disponibles</h4>
                        </li>
                        {availableRooms > 0 ? (
                            Array.from({ length: availableRooms }, (_, index) => (
                                <li className="collection-item" key={index}>
                                    <div>Habitacion
                                        {/* Utiliza el componente Link para redirigir a /reservation */}
                                        <button onClick={handleReservationClick} className="secondary-content">
                                            <i className="material-icons grey-text">send</i>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="collection-item">No hay habitaciones disponibles.</li>
                        )}
                    </ul>
                </div>
            </div>

        </>
    );
}

export default ReservationPage;