import Navbar from '../navbar/navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';

function AdminHotelModificationForm() {
  const history = useHistory();
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({
    name: '',
    rooms_available: 0,
    description: '',
    amenities: [],
  });
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    // Obtener datos del hotel para autocompletar el formulario
    axios
      .get(`http://localhost:5000/hotel/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        const hotel = response.data;
        setHotelData({
          name: hotel.name,
          rooms_available: hotel.rooms_available,
          description: hotel.description,
          amenities: hotel.amenities,
        });
        setSelectedAmenities(hotel.amenities.map(amenity => amenity.name));
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Obtener amenities disponibles para el select
    axios
      .get('http://localhost:5000/amenitie', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        const amenities = response.data.amenities;
        setAvailableAmenities(amenities);
        M.AutoInit();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [history, id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setHotelData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenitySelect = event => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedAmenities(selectedValues);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    const { name, rooms_available, description } = hotelData;

    // Enviar datos del hotel para la modificación
    axios
      .put(`http://localhost:5000/hotel/${id}`, {
        name,
        rooms_available,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        console.log('Hotel modified:', response.data);

        // Actualizar amenities del hotel
        const addedAmenities = selectedAmenities.filter(amenity => (
          !hotelData.amenities.some(existingAmenity => existingAmenity.name === amenity)
        ));
        const removePromises = hotelData.amenities.map(existingAmenity => (
          axios.put(`http://localhost:8000/hotel/${id}/remove-amenitie/${existingAmenity.id}`)
        ));
        const addPromises = addedAmenities.map(amenity => {
          const amenityData = availableAmenities.find(item => item.name === amenity);
          return axios.put(`http://localhost:8000/hotel/${id}/add-amenitie/${amenityData.id}`);
        });

        // Ejecutar todas las peticiones de forma concurrente
        axios.all([...removePromises, ...addPromises])
          .then(axios.spread((...responses) => {
            console.log('Amenities updated:', responses);
            M.toast({ html: '¡Hotel modificado exitosamente!', classes: 'green' });
            history.push('/admin/hoteles');
          }))
          .catch(error => {
            console.error('Error updating amenities:', error);
          });
      })
      .catch(error => {
        console.error('Error updating hotel:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h4>Modificar Hotel</h4>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={hotelData.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="name">Nombre</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  id="rooms_available"
                  name="rooms_available"
                  value={hotelData.rooms_available}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="rooms_available">Habitaciones Totales</label>
              </div>
              <div className="input-field">
                <textarea
                  id="description"
                  name="description"
                  className="materialize-textarea"
                  value={hotelData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <label htmlFor="description">Descripción</label>
              </div>
              <div className="input-field">
                <select
                  multiple
                  value={selectedAmenities}
                  onChange={handleAmenitySelect}
                >
                  <option value="" disabled>Selecciona los amenities</option>
                  {availableAmenities.map(amenity => (
                    <option
                      key={amenity.id}
                      value={amenity.name}
                    >
                      {amenity.name}
                    </option>
                  ))}
                </select>
                <label>Amenities</label>
              </div>
              <button
                className="btn waves-effect waves-light"
                type="submit"
              >
                Modificar Hotel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHotelModificationForm;
