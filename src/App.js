import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import Product from './pages/Product';
import About from './pages/About';
import AIConsulting from './pages/AIConsulting';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Onboarding from './pages/Onboarding';
import SetupComplete from './pages/SetupComplete';

function App() {
  // Auth state - in a real app, this would come from your auth context/store
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('senzia_user');
    const savedOnboarding = localStorage.getItem('senzia_onboarding_complete');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setOnboardingComplete(savedOnboarding === 'true');
    }
    setLoading(false);
  }, []);

  // Login function - called after payment/subscription
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setOnboardingComplete(false);
    localStorage.setItem('senzia_user', JSON.stringify(userData));
    localStorage.setItem('senzia_onboarding_complete', 'false');
  };

  // Complete onboarding
  const completeOnboarding = () => {
    setOnboardingComplete(true);
    localStorage.setItem('senzia_onboarding_complete', 'true');
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setOnboardingComplete(false);
    localStorage.removeItem('senzia_user');
    localStorage.removeItem('senzia_onboarding_complete');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#050505',
        color: 'white'
      }}>
        Loading SENZIA...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-consulting" element={<AIConsulting />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        
        {/* Demo/Booking Route - Leads to signup/checkout */}
        <Route path="/demo" element={<Demo onLogin={handleLogin} />} />
        
        {/* Protected Routes - Only accessible when authenticated */}
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated ? 
              <Onboarding 
                user={user} 
                onComplete={completeOnboarding} 
              /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated && onboardingComplete ? 
              <Dashboard user={user} onLogout={handleLogout} /> : 
              isAuthenticated ? 
                <Navigate to="/onboarding" replace /> : 
                <Navigate to="/demo" replace />
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;