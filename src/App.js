
import './App.css';

import Login from './Login';
import Register from './Register';
function App() {
  return (
    <div className="App">
     
     <div>
      <h1>Hangman game </h1>
      <h5>login to play </h5>
      <Login />
      <Register />
    </div>
    </div>
  );
}

export default App;
