import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js'; // Replace './App' with the correct path to your main component
import './index.css';

ReactDOM.render(
    (<BrowserRouter>
            <App />
    </BrowserRouter>), 
    document.getElementById('root'));