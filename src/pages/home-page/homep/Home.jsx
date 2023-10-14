import React from 'react';
import './home.css';
import { Navbar } from '../../navbar';

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <h1 className="Second-Title">The Future of Online Chess</h1>
      {/* <h2 className="Subtitle">Early Release</h2> */}
    </div>
  );
};

export default Home;
