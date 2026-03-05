import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function SpecialsTicker() {
    const [currentSpecial, setCurrentSpecial] = useState(0);

    const dailySpecials = [
        "🌟 Today: 20% OFF All Flower! 🌟",
        "👽 Alien Mondays: Buy 2 Get 1 Free Edibles! 👽",
        "🚀 Cosmic Deal: $5 OFF Vapes over $30! 🚀",
        "☮️ Peace Out Prices: 15% OFF Your Entire Order! ☮️"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSpecial((prev) => (prev + 1) % dailySpecials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="specials" className="relative z-10 bg-black border-b-2 border-neon-green py-2 overflow-hidden">
            <motion.div
                key={currentSpecial}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-lg tracking-wider text-neon-green text-shadow-neon-glow"
            >
                {dailySpecials[currentSpecial]}
            </motion.div>
        </div>
    );
}
