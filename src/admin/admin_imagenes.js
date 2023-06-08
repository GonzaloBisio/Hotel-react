import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';

const ImagePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/images')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getHotelData = async (hotelId) => {
    try {
      const response = await axios.get(`http://localhost:5000/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Imágenes de Hoteles</span>
              <table className="highlight">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Hotel</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map(image => (
                    <tr key={image.id}>
                      <td>{image.id}</td>
                      <td>
                        <img
                          src={`http://localhost:8000/${image.path}`}
                          alt={`Imagen ${image.id}`}
                          style={{ width: '200px', height: 'auto' }}
                        />
                      </td>
                      <td>
                        <HotelInfo hotelId={image.hotelId} getHotelData={getHotelData} />
                      </td>
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
};

const HotelInfo = ({ hotelId, getHotelData }) => {
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      const data = await getHotelData(hotelId);
      setHotelData(data);
    };
    fetchHotelData();
  }, [hotelId, getHotelData]);

  return (
    <div>
      {hotelData ? (
        <>
          <p>Name: {hotelData.name}</p>
          <p>Rooms Available: {hotelData.rooms_available}</p>
          <p>Description: {hotelData.description}</p>
          <p>Amenities: {hotelData.amenities}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImagePage;
