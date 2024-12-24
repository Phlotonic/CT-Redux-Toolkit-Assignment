import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Exercises from './components/Exercises';
import UpdateExercise from './components/UpdateExercise';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/update-exercise" element={<UpdateExercise />} />
      </Routes>
    </Router>
  );
}

export default App;
