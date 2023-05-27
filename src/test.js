import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const styles = {
    marginTop: '20px'
    
  };
  const white = {
    color: 'white'
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: 'post',
      url: 'https://hangman-serve-pwc-majd.onrender.com/login',
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setLogin(true);
        // Pass the authentication token to the parent component
        onLogin(result.data.token);
        // Redirect to the start game page
        navigate('/start-game');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Display success message */}
      {login ? (
        <p style={{ color: 'white' }}>You are logged in successfully</p>
      ) : (
        <p style={{ color: 'white' }}>You are not logged in</p>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label htmlFor="email">Email</label>
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
        <p style={{ marginTop: '20px' }}>
          Don't have an account yet? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
