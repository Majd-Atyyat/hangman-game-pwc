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

  return (
    <div>
      {/* Display the start game UI */}
      <label htmlFor="word-length">Please select word length:</label>
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
    </div>
  );
};

export default StartGame;