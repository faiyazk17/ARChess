import React, { useState } from 'react';
import './chessmain.css';
import { Navbar } from '../../navbar';
import { Link } from 'react-router-dom';

const avatarOptions = [
    { id: 'avatar1', src: '../../../assets/avatar1.jpg' },
    { id: 'avatar2', src: '../../../assets/avatar2.png' },
];

const timeOptions = [
    { id: '60s', label: '60s' },
    { id: '120s', label: '120s' },
    { id: '180s', label: '180s' },
];
  
const difficultyOptions = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'difficult', label: 'Difficult' },
];

const ChessMain = () => {
    //Handles avatar selection
    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
    const selectedAvatar = avatarOptions[selectedAvatarIndex];

    const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
    const selectedTime = timeOptions[selectedTimeIndex];

    const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);
    const selectedDifficulty = difficultyOptions[selectedDifficultyIndex];

    const handleNextAvatar = () => {
        setSelectedAvatarIndex((prevIndex) => (prevIndex + 1) % avatarOptions.length);
      };
    
    const handlePrevAvatar = () => {
        setSelectedAvatarIndex((prevIndex) =>
            prevIndex === 0 ? avatarOptions.length - 1 : prevIndex - 1
        );
    };

    const handleNextTime = () => {
        setSelectedTimeIndex((prevIndex) => (prevIndex + 1) % timeOptions.length);
    };

    const handlePrevTime = () => {
        setSelectedTimeIndex((prevIndex) =>
        prevIndex === 0 ? timeOptions.length - 1 : prevIndex - 1
        );
    };

    const handleNextDifficulty = () => {
        setSelectedDifficultyIndex((prevIndex) =>
        (prevIndex + 1) % difficultyOptions.length
        );
    };

    const handlePrevDifficulty = () => {
        setSelectedDifficultyIndex((prevIndex) =>
        prevIndex === 0 ? difficultyOptions.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="chessmain">
            <Navbar/>

            <div className="game-settings">
                <div className="settings-box">
                    <h2>Game Settings:</h2>

                    <label className="user-label">Username:</label>
                    <input className="username"
                        type="text"
                        required
                        placeholder="Cool Username Here!">
                    </input>
                    
                    
                    <div className="option-group">
                        <label>Avatar:</label>
                        <button className="arrow-button" onClick={handlePrevAvatar}>
                            &lt;
                        </button>

                        <img
                            src={selectedAvatar.src}
                            className="selected-avatar"
                        />

                        <button className="arrow-button" onClick={handleNextAvatar}>
                            &gt;
                        </button>
                    </div>
                    
                    <div className="option-group">
                        <label>Time:</label>
                        <button className="arrow-button" onClick={handlePrevTime}>
                        &lt;
                        </button>
                        <div className="selected-option">{selectedTime.label}</div>
                        <button className="arrow-button" onClick={handleNextTime}>
                        &gt;
                        </button>
                    </div>
                    
                    <div className="option-group">
                        <label>Difficulty:</label>
                        <button className="arrow-button" onClick={handlePrevDifficulty}>
                        &lt;
                        </button>
                        <div className="selected-option">{selectedDifficulty.label}</div>
                        <button className="arrow-button" onClick={handleNextDifficulty}>
                        &gt;
                        </button>
                    </div>

                    <Link to="/play-game"><button className="start-btn">Start</button></Link>
                </div>
            </div>

            <div className="tutorial-video">

            </div>
        </div>
    )
}

export default ChessMain;