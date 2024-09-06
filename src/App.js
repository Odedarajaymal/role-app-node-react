import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RoleList from "./components/RoleList";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Route for login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes for roles and users */}
          <Route
            path="/roles"
            element={isAuthenticated ? <RoleList /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/roles" : "/login"} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
