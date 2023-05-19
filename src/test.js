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
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const { wordLength } = useParams();
 

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

  useEffect(() => {
    axios
      .get(`https://api.datamuse.com/words?sp=${'?'.repeat(wordLength)}&max=100`)
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomWord = response.data[randomIndex].word;
        setWord(randomWord);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [wordLength]);

  const handleGuess = (event) => {
    const letter = event.target.value.toLowerCase();
    setGuess(letter);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    if (guess === '') {
      alert('Please enter a letter');
    } else if (guesses.includes(guess)) {
      alert('You have already guessed that letter');
    } else {
      setGuesses([...guesses, guess]);
      if (!word.includes(guess)) {
        setWrongGuesses(wrongGuesses + 1);
      }
      setGuess('');
    }
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

  const renderWord = () => {
    if (gameOver) {
      return word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ));
    }
    return word.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guesses.includes(letter) ? letter : '_ '}
      </span>
    ));
  };

  const handleWordLengthChange = (event) => {
    const newWordLength = parseInt(event.target.value);
   
    resetGame();
  };

  return (
    <div className="hangman">
      <h1>Hangman</h1>
      <p>Find the hidden word - Enter a letter</p>
      <p>You only have 6 guesses</p>

      {gameOver ? (
        <>
          <p>You lose. The word was "{word}".</p>
          <button onClick={resetGame}>Play again</button>
        </>
      ) : (
        <>
          <div className="hangman-image">
            <img src={getHangmanImage()} alt="Hangman" />
            <div className="word">
              <h1>{renderWord()}</h1>
            </div>
          </div>
          <form onSubmit={handleGuessSubmit}>
            <label htmlFor="guess">Enter a letter (word length {wordLength}):</label>
            <input type="text" id="guess" value={guess} onChange={handleGuess} />
            <button type="submit">Guess</button>
          </form>
        </>
      )}

      <div className="guesses">
        <h4>Guessed letters:</h4>
        {guesses.map((letter, index) => (
          <h2 key={index}>{letter}</h2>
        ))}
      </div>

      <div className="options">
        <label htmlFor="word-length">Word length:</label>
        <select id="word-length" value={wordLength} onChange={handleWordLengthChange}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
    </div>
  );
};

export default Hangman;
