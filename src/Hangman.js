import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

const Hangman = () => {
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const { gameId } = useParams();
  const [guesses, setGuesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`https://hangman-serve-pwc-majd.onrender.com/game/${gameId}`);
        setGame(response.data);
        console.log('API data fetched:', response.data); // Log the fetched data
      } catch (error) {
        console.log(error);
      }
    };

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    if (game && game.word && game.word.split('').every((letter) => game.correctGuesses.includes(letter))) {
      setGameOver(true);
    }
  }, [game]);

  const handleGuess = (event) => {
    const letter = event.target.value.toLowerCase();
    setGuess(letter);
  };

  const handleGuessSubmit = async (event) => {
    event.preventDefault();

    // Check if the guess is correct
    const isCorrectGuess = game.word.includes(guess);
    // Update the guesses state with the new guess
    setGuesses([...guesses, guess]);

    try {
      const response = await axios.put(`https://hangman-serve-pwc-majd.onrender.com/game/${gameId}/guess`, { guess });
      const updatedGame = response.data;
      setGame(updatedGame);
      setGuess('');
      setGameOver(updatedGame.status !== 'in progress');
    } catch (error) {
      console.log(error);
    }
  };

  const resetGame = () => {
    setGuess('');
    setGameOver(false);
    navigate('/start');
  };

  const shareOnTwitter = () => {
    const postTitle = 'I won the Hangman game!'; 
    const postUrl = window.location.href; // Use the current page URL as the post URL

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;

    window.open(shareUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const postTitle = 'I won the Hangman game!'; 
    const postUrl = window.location.href; // Use the current page URL as the post URL

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

    window.open(shareUrl, '_blank');
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const { word, status, remainingGuesses, correctGuesses, incorrectGuesses } = game;

  const getHangmanImage = () => {
    switch (game.incorrectGuesses.length) {
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

  const changeWordLength = () => {
    navigate('/start');
  };

  return (
    <div className="hangman">
      {status === 'lost' ? (
        <div className="game-over">
          <p className="centered">You lose. The word was "{word}".</p>
          <button onClick={resetGame}>Play again</button>
          <p className="centered">Player Status: {status}</p>
        </div>
      ) : (
        <div className="hangman-content">
          {status !== 'won' && (
            <div className="hangman-image">
              <img src={getHangmanImage()} alt="Hangman" />
              <button onClick={changeWordLength}>Change Word Length</button>
            </div>
          )}
          <div className="hangman-details">
            {status === 'won' ? (
              <div className="game-won">
                <p className="centered">You won!</p>
                <p className="centered">Share with your friends!</p>
                <div className="share-buttons">
                  <FaTwitter onClick={shareOnTwitter} />
                  <FaFacebook onClick={shareOnFacebook} />
                </div>
                <button onClick={resetGame}>Play again</button>
                <p className="centered">The word was "{word}".</p>
                <p className="centered">Player Status: {status}</p>
              </div>
            ) : (
              <form onSubmit={handleGuessSubmit}>
                <h1>Hangman</h1>
                <br />
                <p>Find the hidden word</p>
                <br />
                <p>You have {remainingGuesses} remaining guesses</p>
                <input type="text" value={guess} onChange={handleGuess} maxLength={1} />
                <div className="word">
                  {word.split('').map((letter, index) => (
                    <span key={index} className="letter">
                      {guesses.includes(letter) ? letter : '_'}
                    </span>
                  ))}
                </div>
                <button type="submit">Guess</button>
                <div className="guesses">
                  <h4>Incorrect Guesses:</h4>
                  <h2>{incorrectGuesses.join(', ')}</h2>
                  <br />
                  <br />
                  <br />
                  <p>-Status: {status}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hangman;
