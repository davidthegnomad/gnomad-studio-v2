import React from 'react';

const Footer = () => {
    return (
        <footer className="hidden md:block bg-[#121212] pt-12 pb-6 px-6 text-center">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
                <div className="text-[#F1FAEE]/60 text-sm">
                    &copy; {new Date().getFullYear()} Pisano's Pizza. All rights reserved.
                </div>
                <div className="text-[#F1FAEE]/40 text-xs uppercase tracking-widest font-mono">
                    Designed and built with ♥ by{' '}
                    <a
                        href="https://gnomadstudio.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFB703] hover:text-white transition-colors"
                    >
                        Gnomad Studio
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
