import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import {  Container } from "@mui/material";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import CreateBooking from "./BookingProcess/CreateBooking";
import Bookings from "./Bookings";


function App() {

  return (
    <Router>
      <Container sx={{height: '100vh', py: 4}}>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}>
              <Route path='' element={<Bookings/>}/>
              <Route path='createbooking' element={<CreateBooking/>}/>
            </Route>
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
