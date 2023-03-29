import React, { useContext } from "react";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import MomentList from "./components/MomentList";
import { UserContext } from "./context/UserProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div className="App">
        { token && <Navbar logout={ logout } />}
        <Routes>
          <Route path="/" element={ token ? <Navigate to="/profile" /> : <Auth /> } />
          <Route path="/profile" element={ <ProtectedRoute token={ token } redirectTo="/">
            <Profile />
          </ProtectedRoute> } />
          <Route path="/home" element={ <ProtectedRoute token={ token } redirectTo="/" >
            <LandingPage />
          </ProtectedRoute>} />
          <Route path="/moments" element={ <ProtectedRoute token={token} redirectTo="/">
            <MomentList />
          </ProtectedRoute>} />
        </Routes>
    </div>
  );
}

export default App;
