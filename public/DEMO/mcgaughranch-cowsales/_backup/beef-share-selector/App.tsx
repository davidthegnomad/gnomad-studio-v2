
import React from 'react';
import Header from './components/Header';
import BeefShareCard from './components/BeefShareCard';
import Calculator from './components/Calculator';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import { BEEF_SHARES } from './constants';

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-light selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-16">
        {/* Hero Section */}
        <section className="max-w-4xl mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-ranch-dark mb-6">
            Choose Your <br className="hidden sm:block" /><span className="text-primary italic font-display">Beef Share</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-white/50 backdrop-blur-sm border border-[#e0e7e1] rounded-2xl shadow-sm">
            <div className="bg-primary/10 p-2 rounded-lg text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-ranch-dark">Legal & Custom Exempt Disclosure</h4>
              <p className="text-sm leading-relaxed text-[#63886f]">
                You are purchasing a share of a <strong>live animal</strong>. Ownership is transferred before processing, ensuring full compliance with local farm-to-table regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          <div className="flex-1 space-y-10 sm:space-y-16">
            {/* Share Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {BEEF_SHARES.map((share) => (
                <BeefShareCard key={share.id} share={share} />
              ))}
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-[#e0e7e1] hover:border-primary/40 transition-all shadow-sm">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">list_alt</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-ranch-dark mb-1">Custom Butchering</h4>
                  <p className="text-sm text-[#63886f] leading-relaxed">
                    Personalized cut sheets allow you to decide the thickness of your steaks and size of your roasts.
                  </p>
                </div>
              </div>
              
              <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-[#e0e7e1] hover:border-primary/40 transition-all shadow-sm">
                <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">delivery_dining</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-ranch-dark mb-1">Ranch Delivery</h4>
                  <p className="text-sm text-[#63886f] leading-relaxed">
                    Direct-to-freezer delivery available within a 50-mile radius. Local pickup is always free of charge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator - Moves to side on Large screens */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <Calculator />
          </div>
        </div>
      </main>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default App;
