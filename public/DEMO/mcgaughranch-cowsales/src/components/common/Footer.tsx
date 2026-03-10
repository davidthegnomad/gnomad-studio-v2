
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#0a150e] border-t border-primary/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-8 bg-primary/20 rounded flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">agriculture</span>
            </div>
            <h2 className="text-lg font-bold uppercase tracking-widest">McGaugh Ranch</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
            Committed to heritage ranching, environmental stewardship, and bringing the highest quality pasture-raised beef directly to your table.
          </p>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">social_leaderboard</span>
            </a>
            <a 
              href="#" 
              className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">camera_alt</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400">
            <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-gray-500 dark:text-gray-400">
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span>McGaugh Ranch, Texas Hill Country</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span>hello@mcgaughranch.com</span>
            </li>
            <li className="flex gap-2">
              <span className="material-symbols-outlined text-primary">phone</span>
              <span>(555) 123-4567</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary/5 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© 2024 McGaugh Ranch. All rights reserved. Registered Livestock Entity.</p>
      </div>
    </footer>
  );
};

export default Footer;
