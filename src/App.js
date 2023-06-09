import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReservationPage from './reservation_page';
import ConfirmReservation from './confirm_reservation';
import LoginPage from './login';
import MyReservations from './reservations';
import Register from './register';
import Hotels from './hotels.js';
import AdminPage from './admin/admin_page.js';
import AdminHotels from './admin/admin_hoteles.js';
import CreateHotel from './admin/admin_hoteles_crear';
import AdminUsers from './admin/admin_usuarios';
import CreateUser from './admin/admin_usuarios_crear';
import AmenitiesPage from './admin/admin_amenities';
import CreateAmenity from './admin/admin_amenities_crear';
import ImagePage from './admin/admin_imagenes';
import CreateImage from './admin/admin_imagenes_crear';
import AdminReservations from './admin/admin_reservas';


function App() {
  useEffect(() => {
    document.title = 'Hoteles Online';
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        <ReservationPage />
        </Route>
        <Route path="/confirm-reservation">
          <ConfirmReservation/>
        </Route>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/reservations">
          <MyReservations/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/hoteles">
          <Hotels/>
        </Route>
        <Route path="/admin/hoteles/crear">
          <CreateHotel/>
        </Route>
        <Route path="/admin/hoteles/modificar">
          <Hotels/>
        </Route>
        <Route path="/admin/hoteles">
          <AdminHotels/>
        </Route>
        <Route path="/admin/usuarios/crear">
          <CreateUser/>
        </Route>
        <Route path="/admin/usuarios">
          <AdminUsers/>
        </Route>
        <Route path="/admin/amenities/crear">
          <CreateAmenity/>
        </Route>
        <Route path="/admin/amenities">
          <AmenitiesPage/>
        </Route>
        <Route path="/admin/imagenes/crear">
          <CreateImage/>
        </Route>
        <Route path="/admin/imagenes">
          <ImagePage/>
        </Route>
        <Route path="/admin/reservas">
          <AdminReservations/>
        </Route>
        <Route path="/admin/">
          <AdminPage/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
