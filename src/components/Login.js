import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      
      console.log("Login Response:", res); // Log the response

      if (res.status === 200 && res.data.token && res.data.role) {
        // Store token and role in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Log and redirect user to roles page after login
        console.log("Redirecting to /roles");
        navigate("/roles");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
