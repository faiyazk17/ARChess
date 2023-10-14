import React from 'react';
import { NavLink  } from 'react-router-dom';
import navstyles from './navbar.module.css';

const Navbar = () => {

    return (
        <div className="nav">
            <nav className={navstyles.navbar}>
                <ul className={navstyles.navlinks}>
                <h2 className={navstyles.title}><NavLink to="/"><NavLink to="/home">AR CHESS SIMULATOR</NavLink></NavLink></h2>
                <li><NavLink to="/play-game">Play Against AI</NavLink></li>
                {/* <li><NavLink to="/puzzles">Puzzles</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;