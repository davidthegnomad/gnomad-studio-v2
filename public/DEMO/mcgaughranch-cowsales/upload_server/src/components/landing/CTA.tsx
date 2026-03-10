
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const CTA: React.FC = () => {
  const { user, setAuthModalOpen, setAuthMode } = useAuth();

  const handleCTA = () => {
    if (!user) {
      setAuthMode('signup');
      setAuthModalOpen(true);
    } else {
      // Navigate to options or checkout
      window.location.hash = 'options';
    }
  };

  return (
    <section id="options" className="py-24 px-6 bg-white dark:bg-background-dark overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
        
        <h2 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Ready to secure your <span className="text-primary">ranch-fresh</span> beef?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join our community of owners who value quality, transparency, and a direct connection to the land. Limited shares available for the upcoming season.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4">
          <button 
            onClick={handleCTA}
            className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-primary/20 transform hover:-translate-y-1 active:scale-95"
          >
            {user ? 'Secure Another Share' : 'Explore Ownership Options'}
          </button>
          <button className="bg-background-light dark:bg-white/5 hover:bg-primary/10 border-2 border-primary/20 text-[#112116] dark:text-white px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:-translate-y-1 active:scale-95">
            Contact our Rancher
          </button>
        </div>
        
        {!user && (
          <p className="mt-8 text-sm text-gray-500">
            Already an owner? <button onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }} className="text-primary font-bold hover:underline">Log in to your dashboard</button>
          </p>
        )}
      </div>
    </section>
  );
};

export default CTA;
