import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                >
                    <ImageWithFallback
                        src="/DEMO/shared-images/green_st_unsplash_hero.webp"
                        alt="UFO"
                        className="w-full h-full object-cover opacity-30 object-[center_30%]"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    {/* Alien Icon */}
                    <div className="mb-8 mt-24 flex justify-center">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                                scale: [1, 1.1, 1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="text-9xl drop-shadow-neon-xl"
                        >
                            👽
                        </motion.div>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider font-bungee bg-gradient-to-b from-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
                        WELCOME TO THE<br />GREEN SIDE<br />OF THE GALAXY
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-neon-green text-shadow-neon font-orbitron">
                        Muskogee's favorite hippy-style dispensary for fire flower and out-of-this-world deals.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center call-btn-container mb-12">
                        <a href="tel:918-577-6160">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 text-2xl rounded-lg group call-btn-chaser font-orbitron flex items-center justify-center gap-3"
                            >
                                <span className="chase-line chase-top" />
                                <span className="chase-line chase-right" />
                                <span className="chase-line chase-bottom" />
                                <span className="chase-line chase-left" />
                                <span className="text-2xl z-10">🛸</span>
                                <span className="z-10">CALL THE MOTHERSHIP</span>
                            </motion.button>
                        </a>
                    </div>

                    {/* Peace Sign Animation */}
                    <div className="flex justify-center mt-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-6xl drop-shadow-neon-lg inline-block"
                        >
                            ☮️
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
