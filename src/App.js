import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
       <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;