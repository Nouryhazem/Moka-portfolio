import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import HomePage from './pages/HomePage';
import ProjectGridPage from './pages/ProjectGridPage';
import CustomCursor from './components/CustomCursor';
import Atmosphere from './components/Atmosphere';
import LoadingScreen from './components/LoadingScreen';
import { AudioProvider } from './context/AudioContext';
import { useState, useEffect } from 'react';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } 
          />
          <Route 
            path="/projects/:category" 
            element={
              <PageTransition>
                <ProjectGridPage />
              </PageTransition>
            } 
          />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AudioProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Atmosphere />
            <Router>
              <CustomCursor />
              <AnimatedRoutes />
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </AudioProvider>
  );
}
