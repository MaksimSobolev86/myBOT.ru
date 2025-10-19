import React, { useState, lazy, Suspense, useCallback, useEffect } from 'react';

// Eager load components visible above the fold
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TelegramCTA from './components/TelegramCTA';
import CanvasBackground from './components/CanvasBackground';
import ContactModal from './components/ContactModal';
import Preloader from './components/Preloader';

// Lazy load components that are below the fold for faster initial page load
const Stats = lazy(() => import('./components/Stats'));
const Problems = lazy(() => import('./components/Problems'));
const Features = lazy(() => import('./components/Features'));
const Demo = lazy(() => import('./components/Demo'));
const Pricing = lazy(() => import('./components/Pricing'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTA = lazy(() => import('./components/CTA'));

// A simple fallback component to show while lazy components are loading
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-64" aria-busy="true">
    <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSiteLoaded, setIsSiteLoaded] = useState(false); // Tracks window.onload
  const [isVideoReady, setIsVideoReady] = useState(false); // Tracks hero video readiness
  const [isPreloaderHidden, setIsPreloaderHidden] = useState(false); // Controls preloader final state

  // This effect handles the 'load' event of the window for general assets.
  useEffect(() => {
    const handleLoad = () => setIsSiteLoaded(true);

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // This effect checks if both the site assets and the critical hero video are ready, then hides the preloader.
  useEffect(() => {
    if (isSiteLoaded && isVideoReady) {
      // Use a timeout to ensure the preloader doesn't disappear too abruptly
      setTimeout(() => setIsPreloaderHidden(true), 500);
    }
  }, [isSiteLoaded, isVideoReady]);
  
  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  // Use useCallback to memoize event handlers, preventing unnecessary re-renders of child components
  const handleOpenContactModal = useCallback(() => setIsContactModalOpen(true), []);
  const handleCloseContactModal = useCallback(() => setIsContactModalOpen(false), []);

  return (
    <>
      <Preloader isLoaded={isPreloaderHidden} />
      <div className="text-white bg-transparent overflow-x-hidden isolate">
        <CanvasBackground />
        <Header onContactClick={handleOpenContactModal} />
        <main>
          <Hero onVideoLoaded={handleVideoReady} />
          <Suspense fallback={<LoadingSpinner />}>
            <Stats />
            <Problems />
            <Features />
            <Demo />
            <Pricing />
            <ContactForm />
            <Testimonials />
            <CTA />
          </Suspense>
        </main>
        <Footer />
        <TelegramCTA />
        <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
      </div>
    </>
  );
};

export default App;