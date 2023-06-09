import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const StartGame = () => {
  const [wordLength, setWordLength] = useState(5);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.post(
        'https://hangman-serve-pwc-majd.onrender.com/game',
        { length: wordLength },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response.data); // log the response object 
  
      const gameId = response.data._id;
      console.log(gameId); //// log the gameid
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.log(error);
    }
  };
// Add the logout function
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isLogged');
  navigate('/');
};
  return (
    <div className="box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1 style={{ color: 'white', marginTop: '20px', background: 'black', padding: '10px' }}>Welcome to Hangman Game</h1>
    <label htmlFor="word-length" style={{ color: 'white', fontSize: '24px' }}>Please select word length:</label>
    <select
      id="word-length"
      value={wordLength}
      onChange={(e) => setWordLength(parseInt(e.target.value))}
    >
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
    </select>
    <button onClick={handleStartGame}>Start Game</button>
    <button onClick={logout}>Logout</button> {/* Add the logout button */}
  </div>
  );
};

export default StartGame;