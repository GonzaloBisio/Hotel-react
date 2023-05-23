import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const requestData = location.state && location.state.requestData;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si el usuario ya está logeado
    const token = localStorage.getItem('token');
    if (token) {
      // Redirigir a la página principal
      history.push('/');
    }
  }, [history]);

  const handleLogin = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    // Realizar la solicitud POST a http://localhost:8000/login
    axios.post('http://localhost:8000/login', loginData)
      .then(response => {
        // Manejar la respuesta de la solicitud
        const token = response.data.token;
        // Almacenar el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', token);
        // Redirigir a la página de confirmación de reserva si hay datos de solicitud, de lo contrario, a la página principal
        if (requestData) {
          history.push('/confirm-reservation', { requestData });
        } else {
          history.push('/');
        }
      })
      .catch(error => {
        // Manejar los errores de la solicitud
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
        console.error('Error al iniciar sesión:', error);
      });
  };

  const handleRegister = () => {
    // Redirigir a la página de registro conservando los datos de request_data
    history.push('/register', { requestData });
  };

  return (
    <>
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h4>Iniciar Sesión</h4>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="input-field">
                <input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                />
                <label>Contraseña</label>
              </div>
              <div className="row">
                <div className="col s6">
                  <button className="waves-effect waves-light btn" type="submit">Iniciar Sesión</button>
                </div>
                <div className="col s6">
                  <button className="waves-effect waves-light btn" onClick={handleRegister}>Registrarse</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;