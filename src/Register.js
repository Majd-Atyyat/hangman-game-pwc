import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [register, setRegister] = useState(false);
  const styles = {
    marginTop: '20px',
  };
  const white = {
    color: 'white',
  };

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is not in a valid format');
      valid = false;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }
    

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const configuration = {
        method: 'post',
        url: 'https://hangman-serve-pwc-majd.onrender.com/register',
        data: {
          email,
          password,
        },
      };

      axios(configuration)
        .then((result) => {
          setRegister(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {register ? (
        <p style={white}>You Are Registered Successfully</p>
      ) : (
        <p style={white}>You Are Not Registered</p>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <button type="submit">Register</button>
        <p style={styles}>
          You already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </>
  );
}
