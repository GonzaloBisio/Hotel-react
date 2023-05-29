import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token guardado en localStorage
    setIsLoggedIn(!!token); // Actualizar el estado isLoggedIn en función de si hay un token o no
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    setIsLoggedIn(false); // Actualizar el estado isLoggedIn a false
    history.push('/login'); // Redireccionar al usuario a la página de inicio de sesión
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper grey darken-3">
          <a href="/" className="brand-logo" style={{ marginLeft: 1 + 'em' }}>
            Hoteles Online
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/hoteles">Hoteles</a>
            </li>
            <li>
              <a href="/reservations">Mis Reservas</a>
            </li>
            {isLoggedIn ? (
              <li>
                <a href="/login" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
