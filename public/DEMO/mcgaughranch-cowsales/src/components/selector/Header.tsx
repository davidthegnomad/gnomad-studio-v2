
import React from 'react';
import { LogoIcon } from '@/lib/beef-constants';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e0e7e1] bg-white/90 backdrop-blur-md px-4 sm:px-8 md:px-20 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3 text-ranch-dark">
        <LogoIcon />
        <h1 className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">McGaugh Ranch</h1>
      </div>
      
      {/* Navigation hidden on small mobile, visible from tablet up */}
      <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
        {['Our Beef', 'How It Works', 'Sustainability', 'Contact'].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm font-medium text-[#63886f] hover:text-primary transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="flex items-center gap-2 rounded-full sm:rounded-lg px-3 py-2 sm:px-4 bg-primary text-ranch-dark text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition-all active:scale-95">
          <span className="material-symbols-outlined text-lg">person</span>
          <span className="hidden xs:inline">Account</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
