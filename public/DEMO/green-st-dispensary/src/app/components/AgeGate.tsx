import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf } from 'lucide-react';

export function AgeGate() {
    const [isVerified, setIsVerified] = useState(() => {
        return localStorage.getItem('greenst_age_verified_v2') === 'true';
    });

    const handleVerify = () => {
        localStorage.setItem('greenst_age_verified_v2', 'true');
        setIsVerified(true);
    };

    const handleDeny = () => {
        window.location.href = "https://www.google.com";
    };

    if (isVerified) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="neon-card-strong max-w-lg w-full p-8 md:p-12 text-center rounded-2xl border-neon-green"
                >
                    <div className="mb-6 flex justify-center">
                        <Leaf size={48} className="text-neon-green drop-shadow-neon" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bungee text-neon-green text-shadow-neon mb-4 tracking-wider">
                        ARE YOU 18+?
                    </h2>
                    <p className="text-gray-300 mb-8 font-orbitron text-lg">
                        You must be at least 18 years old and possess a valid Oklahoma Medical Marijuana License to enter Green ST. Dispensary.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleDeny}
                            className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg rounded hover:bg-gray-800 transition-colors font-orbitron"
                        >
                            I am under 18
                        </button>
                        <button
                            onClick={handleVerify}
                            className="neon-btn font-orbitron px-8 py-3 rounded-lg font-bold text-lg tracking-wider"
                        >
                            YES, I AM 18+
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
