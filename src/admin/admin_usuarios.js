import Navbar from '../navbar/navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

function AdminUsers() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      history.push('/login');
      return;
    }

    axios.get('http://localhost:5000/user', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
      .then(response => {
        const usersData = response.data.users; // Acceder a la propiedad 'users' de la respuesta
        setUsers(usersData);
        M.AutoInit();
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, [history]);

  const handleCreateUser = () => {
    history.push('/admin/usuarios/crear');
  };

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="col s10">
              <h4>Usuarios</h4>
            </div>
            <div className="col s2">
              <button
                className="btn waves-effect waves-light grey darken-3 right"
                onClick={handleCreateUser}>
                Crear
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Administrador</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.dni}</td>
                    <td>{user.email}</td>
                    <td>{user.admin === 1 ? 'Sí' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
