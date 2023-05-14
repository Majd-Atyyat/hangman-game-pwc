import React, { useState } from "react";

function StartGame({ startGame }) {
  const [wordLength, setWordLength] = useState(5);

  const handleWordLengthChange = (event) => {
    setWordLength(parseInt(event.target.value));
  };

  const handleStartGameClick = () => {
    startGame(wordLength);
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      <label htmlFor="word-length-select">Choose word length:</label>
      <select
        id="word-length-select"
        value={wordLength}
        onChange={handleWordLengthChange}
      >
        <option value="4">4 letters</option>
        <option value="5">5 letters</option>
        <option value="6">6 letters</option>
        <option value="7">7 letters</option>
      </select>
      <button onClick={handleStartGameClick}>Start Game</button>
    </div>
  );
}

export default StartGame;
