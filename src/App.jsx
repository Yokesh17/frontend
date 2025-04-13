import './App.css';
import {HeroUIProvider} from "@heroui/react";
import Login from "./components/login/Login"
import Notification from "./components/Notification/Notify";
import Register from "./components/login/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes as needed */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      {/* <Login /> */}
      <Notification />
    </>
  )
}

export default App
