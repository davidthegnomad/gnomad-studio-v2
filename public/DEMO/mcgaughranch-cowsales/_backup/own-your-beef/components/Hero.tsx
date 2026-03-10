
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Hero: React.FC = () => {
  const { user, setAuthModalOpen, setAuthMode } = useAuth();

  const handleStart = () => {
    if (!user) {
      setAuthMode('signup');
      setAuthModalOpen(true);
    } else {
      window.location.hash = 'options';
    }
  };

  return (
    <section className="relative h-[85vh] lg:h-[90vh] min-h-[600px] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Lush ranch landscape with cattle" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDAj61ukparushwiXLdsf_XHpTKzRkiW2E0tM5Rm4Pw1ejByVZoxyWevdxLKcidirTEsAa6m0aB6fMesu-l59cruOl-6fCEO_rpR8n8jyutWS0lXwNX2x6W80AjikJusegndbyDOAUkgnbbxWLf9K56BVhQXmaJS2bY_R5Bxb95iboa09w2Ak7IhaWY35RmjikENzWzjTXez6AN0IQ68UukJk5Nim5238MoH-lYuLVLTHIXpIWjQcGhm8WhJU6AQHUQ3-e04CD0g"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/50 lg:via-background-dark/30 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <span className="inline-block py-1.5 px-4 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-bold mb-6 uppercase tracking-[0.2em] backdrop-blur-md border border-primary/20">
            Premium Livestock Ownership
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
            Own the Ranch Experience. <span className="text-primary italic">Own Your Beef.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/80 mb-10 leading-relaxed font-light max-w-xl">
            Secure your share of a live McGaugh Ranch cow today for the freshest, custom-processed beef later. A direct connection from our pasture to your home.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={handleStart}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/30"
            >
              {user ? 'View My Ownership' : 'Explore Ownership Options'}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all text-center">
              Watch Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
