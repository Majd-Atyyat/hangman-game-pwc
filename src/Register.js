import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const styles = {
    marginTop: '20px'
    
  };
  const white = {
    color: 'white'
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const configuration = {
      method: "post",
      url: "https://hangman-serve-pwc-majd.onrender.com/register",
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
        <p style={styles}>
          You already have an account? {" "}
          <Link to="/">Login here</Link>
        </p>
      </form>
    </>
  );
}