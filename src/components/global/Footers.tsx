import React from 'react';

interface FooterProps {
    clientName: string;
    address: string;
    phone: string;
    accentColor?: string;
}

/**
 * Gnomad Studio Standard Desktop Footer
 * Guidelines: Character-perfect NAP, lint-free social links, attribution.
 */
export const GlobalDesktopFooter: React.FC<FooterProps> = ({ clientName, address, phone, accentColor = '#6d28d9' }) => {
    return (
        <footer className="hidden md:block bg-[#0f0c15] text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: accentColor }}>{clientName}</h3>
                    <p className="text-gray-400">{address}</p>
                    <a href={`tel:${phone.replace(/\D/g, '')}`} className="block mt-2 hover:text-cyan-400 transition-colors">
                        {phone}
                    </a>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-gray-300">Quick Links</span>
                    <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
                    <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                    <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
                <div className="flex flex-col items-start md:items-end justify-between">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Designed with ❤️ by <a href="https://gnomadstudio.org" className="hover:text-cyan-400 underline" title="Visit Gnomad Studio">Gnomad Studio</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/**
 * Gnomad Studio Standard Mobile Fixed Footer
 * Guidelines: Symmetrical 3-button design, open/closed indicator.
 */
export const GlobalMobileFooter: React.FC<FooterProps & { isOpen: boolean }> = ({ phone, address, isOpen, accentColor = '#6d28d9' }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0c15]/90 backdrop-blur-md border-t border-gray-800 z-50">
            <div className="flex justify-around items-center py-3 px-2">
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex flex-col items-center space-y-1" title="Call Us">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800" style={{ border: `1px solid ${accentColor}` }}>
                        <span className="text-white text-xs">📞</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Call</span>
                </a>

                <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mb-1 ${isOpen ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase">{isOpen ? 'Open Now' : 'Closed'}</span>
                </div>

                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-1" title="Get Directions">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800" style={{ border: `1px solid ${accentColor}` }}>
                        <span className="text-white text-xs">📍</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Maps</span>
                </a>
            </div>
        </div>
    );
};
