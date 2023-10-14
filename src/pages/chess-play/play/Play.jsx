import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './play.css';
import Board from "../../../components/Board";
import Clock from "../play/Clock";
import * as ChessJS from 'chess.js';

import { NavLink } from 'react-router-dom';

function Play() {

  const [fen, setFen] = useState('start');
  const [playerTurn, setPlayerTurn] = useState('w');
  const [aiThinking, setAiThinking] = useState(false);
  const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
  const chess = new Chess();

  const [isControlling, setIsControlling] = useState(false);

  const startControlMouse = () => {
    fetch('http://localhost:5000/control_mouse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'start' }),
    });
    setIsControlling(true);
  };

  const stopMouseControl = async () => {
    try {
      const response = await fetch('http://localhost:5000/control_mouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'stop' })
      });
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error('Error stopping mouse control:', error);
    }
  }; 

  const makeMove = async (move) => {
    if (!aiThinking) {
      const updatedFen = movePiece(fen, move.sourceSquare, move.targetSquare);
      setFen(updatedFen);
      setPlayerTurn(playerTurn === 'w' ? 'b' : 'w');

      if (playerTurn === 'w') {
        setAiThinking(true);
        await makeAiMove(updatedFen);
        setAiThinking(false);
      }
    }
  };

  const makeAiMove = async (fen) => {
    try {
      const response = await axios.post('/get_ai_move', { fen });
      const aiMove = response.data.move;
      const newFen = movePiece(fen, aiMove.substring(0, 2), aiMove.substring(2, 4));
      setFen(newFen);
      setPlayerTurn('w');
    } catch (error) {
      console.error('Error getting AI move:', error);
    }
  };

  const movePiece = (currentFen, sourceSquare, targetSquare) => {
    chess.load(currentFen);
    const move = chess.move({ from: sourceSquare, to: targetSquare });
    if (move) {
      return chess.fen();
    }
    return currentFen;
  };

    return (
      <div className="Play">
          <div style={{width: "fit-content"}}>
            <nav>
                <ul>
                  <h2 className="game-name"><NavLink to="/"><NavLink to="/home">AR CHESS</NavLink></NavLink></h2>
                </ul>
            </nav>
            <Board positon={fen} onDrop={(move) => makeMove(move)}/>
            {/* <Clock /> */}
            <button className="ar-start" onClick={startControlMouse}>Start AR Mouse</button>
            <button className="ar-stop" onClick={stopMouseControl}>Stop AR Mouse</button>
          </div>
      </div>
    );
}

export default Play;