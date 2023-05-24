import Navbar from './navbar/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReservationPage from './reservation_page';
import ConfirmReservation from './confirm_reservation';
import LoginPage from './login';
import MyReservations from './reservations';
import Register from './register';
import Hotels from './hotels.js';

function App() {
  return (
    <Router>
      <Navbar />
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
      </Switch>
    </Router>
  );
}
export default App;
