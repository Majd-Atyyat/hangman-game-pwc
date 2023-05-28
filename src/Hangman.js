import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

const Hangman = () => {
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { gameId } = useParams();


  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`https://hangman-serve-pwc-majd.onrender.com/game/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    if (game && wrongGuesses >= game.remainingGuesses) {
      setGameOver(true);
    }
  }, [game, wrongGuesses]);

  useEffect(() => {
    if (game && game.word && game.word.split('').every((letter) => guesses.includes(letter))) {
      setGameOver(true);
    }
  }, [game, guesses]);

  const handleGuess = (event) => {
    const letter = event.target.value.toLowerCase();
    setGuess(letter);
  };

  const handleGuessSubmit = async (event) => {
    event.preventDefault();
    // Send the guess to the backend and update the game state
    try {
      const response = await axios.put(`https://hangman-serve-pwc-majd.onrender.com/game/${gameId}/guess`, { guess });
      const updatedGame = response.data;
      setGuesses(updatedGame.guesses);
      setWrongGuesses(updatedGame.incorrectGuesses.length);
      setGameOver(updatedGame.status !== 'in progress');
    } catch (error) {
      console.log(error);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const { word, remainingGuesses } = game;

  const getHangmanImage = () => {
    switch (wrongGuesses) {
      case 0:
        return img0;
      case 1:
        return img1;
      case 2:
        return img2;
      case 3:
        return img3;
      case 4:
        return img4;
      case 5:
        return img5;
      default:
        return img6;
    }
  };

  const resetGame = () => {
    setGuess('');
    setGuesses([]);
    setWrongGuesses(0);
    setGameOver(false);
  };

  return (
    <div className="hangman">
      {gameOver ? (
        <>
          <p className="centered">You lose. The word was "{word}".</p>
          <button onClick={resetGame}>Play again</button>
        </>
      ) : (
        <div className="hangman-content">
          <div className="hangman-image">
            <img src={getHangmanImage()} alt="Hangman" />
          </div>
          <div className="hangman-details">
            <form onSubmit={handleGuessSubmit}>
              <input type="text" value={guess} onChange={handleGuess} maxLength={1} />
              <button type="submit">Guess</button>
            </form>
            <p>Word: {word}</p>
            <p>Guesses: {guesses.join(', ')}</p>
            {remainingGuesses !== null && (
              <>
                <p>You have {remainingGuesses} remaining guesses.</p>
                <p>You only have {remainingGuesses - wrongGuesses} guesses left.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hangman;
