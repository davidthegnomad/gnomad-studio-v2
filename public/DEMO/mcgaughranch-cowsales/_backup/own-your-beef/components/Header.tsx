
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, setAuthModalOpen, setAuthMode } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[60] w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">agriculture</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#112116] dark:text-white uppercase tracking-widest">McGaugh Ranch</h2>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#story">Our Story</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#options">Ownership</a>
          {user && (
            <a className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1" href="#dashboard">
              <span className="material-symbols-outlined text-lg">dashboard</span>
              Dashboard
            </a>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium opacity-60">Hello, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="text-sm font-bold hover:text-primary transition-colors px-4"
                >
                  Log In
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden size-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 top-20 bg-background-light dark:bg-background-dark z-[55] lg:hidden transition-all duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <nav className="flex flex-col p-8 space-y-6">
          <a className="text-2xl font-bold border-b border-primary/10 pb-4" href="#story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
          <a className="text-2xl font-bold border-b border-primary/10 pb-4" href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
          <a className="text-2xl font-bold border-b border-primary/10 pb-4" href="#options" onClick={() => setIsMobileMenuOpen(false)}>Ownership Options</a>
          
          <div className="pt-8 space-y-4">
            {user ? (
              <>
                <div className="p-4 bg-primary/5 rounded-xl flex items-center gap-3">
                  <div className="size-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-gray-100 dark:bg-white/5 py-4 rounded-xl font-bold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20"
                >
                  Create Account
                </button>
                <button 
                  onClick={() => handleAuthClick('login')}
                  className="w-full border-2 border-primary text-primary py-4 rounded-xl font-bold"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
