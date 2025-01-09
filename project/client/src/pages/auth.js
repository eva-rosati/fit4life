import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

//main auth controlling login and registration
export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

//login component
const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //function that will navigate to homepage when called

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //make an api call to the backend login route
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      //store the received token and user ID in cookies and local storage
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      
      //redirect to the home page (or wherever you want after login)
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

//register component
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //make an api call to the backend register route
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
