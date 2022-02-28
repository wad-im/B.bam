import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { useContext } from "react";
import { UserContext } from "../context";
import {  Container } from "@mui/material";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [user, setUser] = useContext(UserContext)

  return (
    <Router>
      <Container sx={{height: '100vh', py: 4}}>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
