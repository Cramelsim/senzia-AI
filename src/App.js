import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Demo from './pages/Demo';
import Product from './pages/Product';
import About from './pages/About';
import AIConsulting from './pages/AI-cnsulting';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import DataSources from './pages/DataSources';
import Reports from './pages/Reports';
import AIAssistant from './pages/AIAssistant';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('senzia_user');
    const savedOnboarding = localStorage.getItem('senzia_onboarding_complete');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setOnboardingComplete(savedOnboarding === 'true');
      console.log('✅ User authenticated:', JSON.parse(savedUser));
    } else {
      console.log('❌ No user found in localStorage');
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    console.log('🔐 handleLogin called with:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    setOnboardingComplete(false);
    localStorage.setItem('senzia_user', JSON.stringify(userData));
    localStorage.setItem('senzia_onboarding_complete', 'false');
    console.log('✅ User logged in, redirecting to onboarding');
  };

  const completeOnboarding = () => {
    console.log('✅ Onboarding completed');
    setOnboardingComplete(true);
    localStorage.setItem('senzia_onboarding_complete', 'true');
  };

  const handleLogout = () => {
    console.log('👋 User logged out');
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

  console.log('🔍 App state:', { isAuthenticated, onboardingComplete, user });

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
        
        {/* Demo Route */}
        <Route path="/demo" element={<Demo onLogin={handleLogin} />} />
        
        {/* Onboarding Route */}
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated ? 
              <Onboarding user={user} onComplete={completeOnboarding} /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        {/* Protected Routes - Dashboard and others */}
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
        
        <Route 
          path="/data-sources" 
          element={
            isAuthenticated && onboardingComplete ? 
              <DataSources /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            isAuthenticated && onboardingComplete ? 
              <Reports /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        <Route 
          path="/ai-assistant" 
          element={
            isAuthenticated && onboardingComplete ? 
              <AIAssistant /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        <Route 
          path="/insights" 
          element={
            isAuthenticated && onboardingComplete ? 
              <Insights /> : 
              <Navigate to="/demo" replace />
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            isAuthenticated && onboardingComplete ? 
              <Settings /> : 
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