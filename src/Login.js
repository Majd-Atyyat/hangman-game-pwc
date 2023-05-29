import React, { useState } from 'react';
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const styles = {
    marginTop: '20px'
  };
  const white = {
    color: 'white'
  };
  
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const configuration = {
      method: "post",
      url: "https://hangman-serve-pwc-majd.onrender.com/login",
      data: {
        email,
        password,
      },
    };
  
    axios(configuration)
      .then((result) => {
        const { message, email, token } = result.data;
  
        if (message === "Login Successful") {
          localStorage.setItem('token', token);
          setToken(token);
          setLogin(true);
          localStorage.setItem('isLogged', true);
          navigate("/start", { state: { token } });
        } else {
          setErrors({ message });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors({ message: error.response.data.message });
        } else {
          setErrors({ message: "An error occurred" });
        }
      });
  };

  return (
    <div>
      {/* display success message */}
      {login ? (
        <p style={white}>You Are Logged in Successfully</p>
      ) : (
        <p style={white}>You Are Not Logged in</p>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log In</button>
        {errors.message && <p className="error">{errors.message}</p>}
        <p style={styles}>
          Don't have an account yet?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
