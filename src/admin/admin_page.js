import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AdminPage() {
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Verificar si hay un token almacenado en el almacenamiento local (localStorage)
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            // Redireccionar a la página de inicio de sesión si no hay token almacenado
            history.push('/login');
        }

        // Verificar si el usuario es administrador
        axios.get('http://localhost:5000/myuser', {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(response => {
                if (response.data["admin"] === 0) {
                    alert(response.data["admin"])
                    // Redireccionar al inicio si el usuario no es administrador
                    history.push('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                history.push('/');
            });
    }, [history, token]);

    return (
        <>
            <Navbar />
            <div className="row">
                <h4>Administrador</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/admin/hoteles">Hoteles</Link>
                            </td>
                            <td>
                                <Link to="/admin/hoteles/crear" className="btn waves-effect waves-light grey darken-3">
                                    Crear
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/admin/reservas">Reservas</Link>
                            </td>
                            <td>
                                <Link to="/admin/reservas/crear" className="btn waves-effect waves-light grey darken-3">
                                    Crear
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/admin/usuarios">Usuarios</Link>
                            </td>
                            <td>
                                <Link to="/admin/usuarios/crear" className="btn waves-effect waves-light grey darken-3">
                                    Crear
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/admin/amenities">Amenities</Link>
                            </td>
                            <td>
                                <Link to="/admin/amenities/crear" className="btn waves-effect waves-light grey darken-3">
                                    Crear
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/admin/imagenes">Imagenes</Link>
                            </td>
                            <td>
                                <Link to="/admin/imagenes/crear" className="btn waves-effect waves-light grey darken-3">
                                    Crear
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminPage;
