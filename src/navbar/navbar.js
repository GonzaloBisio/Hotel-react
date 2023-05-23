import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');

    // Redireccionar al usuario a la página de inicio de sesión
    history.push('/login');
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper grey darken-3">
          <a href="/" className="brand-logo" style={{ marginLeft: 1 + 'em' }}>
            Sheraton
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Hoteles</a>
            </li>
            <li>
              <a href="/reservations">Mis Reservas</a>
            </li>
            <li>
              <a href="/login" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
