import { Phone, MapPin, Grid } from 'lucide-react';

export function MobileFooter() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-neon-green/50 pb-safe pt-2 px-2 shadow-[0_-10px_20px_rgba(0,0,0,0.8)]">
            <div className="flex justify-around items-center">
                {/* Menu */}
                <a href="#menu" className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-neon-green transition-colors">
                    <Grid size={24} />
                    <span className="text-[10px] font-orbitron font-bold tracking-wider">MENU</span>
                </a>

                {/* Call */}
                <a href="tel:918-577-6160" className="flex flex-col items-center gap-1 p-2 -mt-6">
                    <div className="bg-neon-green/10 border-2 border-neon-green p-3 rounded-full shadow-[0_0_15px_rgba(57,255,20,0.5)] text-neon-green">
                        <Phone size={28} />
                    </div>
                    <span className="text-[10px] font-orbitron font-bold tracking-wider text-neon-green mt-1">CALL</span>
                </a>

                {/* Directions */}
                <a
                    href="https://maps.google.com/?q=301+S+Main+St,+Muskogee,+OK+74401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-neon-green transition-colors"
                >
                    <MapPin size={24} />
                    <span className="text-[10px] font-orbitron font-bold tracking-wider">MAP</span>
                </a>
            </div>
        </div>
    );
}
