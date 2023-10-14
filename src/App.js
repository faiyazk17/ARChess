import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { Home } from './pages/home-page';
import { ChessMain } from './pages/chess-main';
import { Play } from './pages/chess-play';
import { Puzzles } from './pages/chess-puzzles';
import { About } from './pages/about-ai';
import { Contact } from './pages/contact-page';


export default class App extends Component{
  render(){
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/play-main" element={<ChessMain />} />
          <Route path="/play-game" element={<Play />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    );
  }
};