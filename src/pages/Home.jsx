import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Landing/Hero';
import Values from '../components/Landing/Values';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Values />
    </div>
  );
};

export default Home;