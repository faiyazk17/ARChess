import React from 'react';
import './about.css';
import { Navbar } from '../../navbar';

const About = () => {

    return (
        <div className="about">
            <Navbar/>
            <div className='about-main'>
                <p className='about-heading'>
                    <b>About Us: </b>Revolutionizing Chess with Augmented Reality
                </p>
                <p className='about-main-text'>
                Welcome to our world, where the age-old game of chess has been reimagined through the marvels of augmented reality and the enchantment of gesture control. We are the minds behind the AR Chess Game, a team of tech enthusiasts and chess lovers who dared to ask, "What if chess pieces moved at the wave of a hand?" <br /><br />

                Our vision became reality as we merged the art of hand gestures with the strategy of chess. Imagine commanding pieces with a flick, watching knights charge and queens gracefully advance, all in your own surroundings. With our AR Chess Game, the boundary between reality and the game blurs, and you become the maestro of this magical battlefield. <br /> <br />

                Whether you're a chess novice or a seasoned player, our intuitive gesture controls make gameplay natural and exciting. We're more than creators; we're trailblazers, committed to expanding the horizons of gaming innovation. <br /><br />

                Join us in shaping the future of gaming, where every move is a gesture of wonder. This is the AR Chess Team redefining chess, one gesture at a time.
                </p>
            </div>
        </div>
    )
}

export default About;
