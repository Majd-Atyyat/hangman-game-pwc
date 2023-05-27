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
  const [gameId, setGameId] = useState(null);
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { wordLength } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Create a new game and retrieve the game ID
    axios
      .post('https://hangman-serve-pwc-majd.onrender.com/game', { length: wordLength }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGameId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wordLength]);

  useEffect(() => {
    if (gameId) {
      // Retrieve the word for the current game
      axios
        .get(`https://hangman-serve-pwc-majd.onrender.com/games/${gameId}/word`)
        .then((response) => {
          setWord(response.data.word);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [gameId]);

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



  const handleGuess = (event) => {
    const letter = event.target.value.toLowerCase();
    setGuess(letter);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    // Send the guess to the backend and update the game state
    axios
      .post(`https://hangman-serve-pwc-majd.onrender.com/games/${gameId}/guesses`, { guess })
      .then((response) => {
        const { guesses, incorrectGuesses, remainingGuesses, status } = response.data;
        setGuesses(guesses);
        setWrongGuesses(incorrectGuesses.length);
        setGameOver(status !== 'in progress');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetGame = () => {
    setWord('');
    setGuess('');
    setGuesses([]);
    setMaxWrongGuesses(6);
    setWrongGuesses(0);
    setGameOver(false);
  };

  

  useEffect(() => {
    if (wrongGuesses >= maxWrongGuesses) {
      setGameOver(true);
    }
  }, [wrongGuesses, maxWrongGuesses]);

  useEffect(() => {
    if (word && word.split('').every((letter) => guesses.includes(letter))) {
      setGameOver(true);
    }
  }, [word, guesses]);

  return (
    <div className="hangman">
      {gameOver ? (
        <>
          <p className='centered'>You lose. The word was "{word}".</p>
          <button onClick={resetGame}>Play again</button>
        </>
      ) : (
        <div className="hangman-content">
          <div className="hangman-image">
            <img src={getHangmanImage()} alt="Hangman" />
          </div>
          <div className="hangman-form">
            
            <form onSubmit={handleGuessSubmit} className="guess-form">
            <h1>Hangman</h1>
            <p>Find the hidden word </p>
           
            <p>You only have 6 guesses</p>
            
              <label htmlFor="guess">Enter a letter (word length {wordLength}):</label>
              <input type="text" id="guess" value={guess} onChange={handleGuess} />
              <div className="word">
              {word.split('').map((letter, index) => (
                <span key={index} className="letter">
                  {guesses.includes(letter) ? letter : '_ '}
                </span>
              ))}
            </div>
              <button type="submit">Guess</button>
              <div className="guesses">
              <h4>Guessed letters:</h4>
              {guesses.map((letter, index) => (
                <h2 key={index}>{letter}</h2>
              ))}
            </div>
            </form>
           
          </div>
        </div>
      )}
     
    </div>
  );
};

export default Hangman;
