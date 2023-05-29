import "./App.css";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Hangman from "./Hangman";
import StartGame from "./StartGame"; 
import React, { useState } from 'react';
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={login ? <StartGame /> : <Login setLogin={setLogin} />}
      />
   <Route path="/register" element={<Register />} />

<Route element={<ProtectedRoutes/>}>
<Route path="/start" element={<StartGame />} /> 
<Route path="/game/:gameId" element={<Hangman />} />
</Route>
     
   
    </Routes>
  );
}

export default App;
