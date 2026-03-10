import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Phone, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MobileDispatch: React.FC = () => {
    const { user, setAuthModalOpen } = useAuth();

    return (
        <div className="fixed bottom-6 w-[90%] left-[5%] z-[65] lg:hidden">
            <div className="bg-white dark:bg-black/80 border border-primary/20 dark:border-white/10 p-2 rounded-2xl flex items-center justify-around shadow-2xl backdrop-blur-xl">

                <Link to="/shop" className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group flex-1">
                    <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center text-cta mb-1 group-hover:scale-110 transition-transform">
                        <ShoppingCart size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-ranch-dark dark:text-gray-300 group-hover:text-cta tracking-widest uppercase">Pricing</span>
                </Link>

                <a href="tel:555" className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group flex-1 border-x border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center text-cta mb-1 group-hover:scale-110 transition-transform">
                        <Phone size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-ranch-dark dark:text-gray-300 group-hover:text-cta tracking-widest uppercase">Contact</span>
                </a>

                <button
                    onClick={() => !user && setAuthModalOpen(true)}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-primary/5 active:bg-primary/10 transition-colors group flex-1"
                >
                    <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center text-cta mb-1 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-ranch-dark dark:text-gray-300 group-hover:text-cta tracking-widest uppercase">Login</span>
                </button>

            </div>
        </div>
    );
};

export default MobileDispatch;
