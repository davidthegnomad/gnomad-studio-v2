
import React from 'react';
import { LogoIcon } from '@/lib/beef-constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#e0e7e1] py-12 px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 text-ranch-dark mb-4">
            <div className="size-5">
              <LogoIcon />
            </div>
            <h2 className="text-lg font-bold">McGaugh Ranch</h2>
          </div>
          <p className="text-sm text-[#63886f] leading-relaxed">
            Raising premium grass-fed beef with integrity and respect for the land. From our pasture to your freezer.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">Shop</h4>
            <ul className="text-sm text-[#63886f] space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#">Quarter Share</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Half Share</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Whole Share</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">About</h4>
            <ul className="text-sm text-[#63886f] space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">The Process</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">Connect</h4>
            <ul className="text-sm text-[#63886f] space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#">Instagram</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Facebook</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Email Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#f0f4f2] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-[#63886f]">© 2024 McGaugh Ranch. All cattle are sold as live animal shares.</p>
        <div className="flex gap-6 text-[10px] text-[#63886f]">
          <a className="hover:underline" href="#">Privacy Policy</a>
          <a className="hover:underline" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
