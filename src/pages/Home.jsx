import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Home;