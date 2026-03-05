import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TireQuote from './components/TireQuote';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background-dark text-text-light relative">
      <div className="absolute inset-0 bg-grunge-pattern pointer-events-none"></div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <TireQuote />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
