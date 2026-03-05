import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MenuHighlights() {
    return (
        <section id="menu" className="relative z-10 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl text-center mb-16 font-bungee bg-gradient-to-b from-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]"
                >
                    MENU HIGHLIGHTS
                </motion.h2>

                <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-8 justify-start md:justify-items-center overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
                    {/* The Flower Room */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="group relative aspect-square w-[85vw] md:w-full shrink-0 snap-center max-w-[20rem] rounded-full overflow-hidden flex flex-col items-center justify-start text-center p-8 bg-black border-2 border-neon-green/30 hover:border-neon-green transition-all shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        <ImageWithFallback
                            src="/DEMO/shared-images/green_st_macro_flower.webp"
                            alt="The Flower Room"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-20 transition-opacity duration-300 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80 group-hover:bg-black/70 transition-colors duration-300 z-10"></div>

                        <div className="relative z-20 flex flex-col items-center justify-start w-full h-full pt-6">
                            <h3 className="text-2xl lg:text-3xl mb-2 text-neon-green text-shadow-neon font-orbitron font-bold tracking-wider transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                THE FLOWER<br />ROOM
                            </h3>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex flex-col items-center">
                                <p className="text-gray-300 mb-3 text-xs lg:text-sm font-orbitron px-2">
                                    Our reputation speaks for itself: <span className="italic text-neon-green font-bold">stinky</span>, high-THC flower that'll take you to another dimension.
                                </p>
                                <div className="space-y-1 font-orbitron text-[10px] lg:text-xs text-gray-400">
                                    <div className="flex items-center justify-center">
                                        <Sparkles size={12} className="mr-1 text-neon-green" /> Donkey Butter #9
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Sparkles size={12} className="mr-1 text-neon-green" /> Velvet Heat
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Sparkles size={12} className="mr-1 text-neon-green" /> Cosmic Strains...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Astronaut Edibles */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group relative aspect-square w-[85vw] md:w-full shrink-0 snap-center max-w-[20rem] rounded-full overflow-hidden flex flex-col items-center justify-start text-center p-8 bg-black border-2 border-neon-green/30 hover:border-neon-green transition-all shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        <ImageWithFallback
                            src="/DEMO/shared-images/green_st_astronaut_edibles.webp"
                            alt="Astronaut Edibles"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-20 transition-opacity duration-300 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80 group-hover:bg-black/70 transition-colors duration-300 z-10"></div>

                        <div className="relative z-20 flex flex-col items-center justify-start w-full h-full pt-6">
                            <h3 className="text-2xl lg:text-3xl mb-2 text-neon-green text-shadow-neon font-orbitron font-bold tracking-wider transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                ASTRONAUT<br />EDIBLES
                            </h3>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex flex-col items-center">
                                <p className="text-gray-300 mb-4 text-xs lg:text-sm font-orbitron px-2">
                                    Fuel your journey with delicious, precisely-dosed edibles. From gummies to chocolates, we've got the treats to elevate your orbit.
                                </p>
                                <p className="text-[10px] lg:text-xs italic text-neon-green font-orbitron mt-auto">
                                    🚀 Perfect for slow, controlled lift-off!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Alien Tech Vapes */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="group relative aspect-square w-[85vw] md:w-full shrink-0 snap-center max-w-[20rem] rounded-full overflow-hidden flex flex-col items-center justify-start text-center p-8 bg-black border-2 border-neon-green/30 hover:border-neon-green transition-all shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
                    >
                        <ImageWithFallback
                            src="/DEMO/shared-images/green_st_alien_vape.webp"
                            alt="Alien Tech Vapes"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-20 transition-opacity duration-300 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80 group-hover:bg-black/70 transition-colors duration-300 z-10"></div>

                        <div className="relative z-20 flex flex-col items-center justify-start w-full h-full pt-6">
                            <h3 className="text-2xl lg:text-3xl mb-2 text-neon-green text-shadow-neon font-orbitron font-bold tracking-wider transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                ALIEN TECH<br />VAPES
                            </h3>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2 flex flex-col items-center">
                                <p className="text-gray-300 mb-4 text-xs lg:text-sm font-orbitron px-2">
                                    Advanced vaporizer technology meets premium concentrates. Discreet, powerful, and perfect for the modern space traveler.
                                </p>
                                <p className="text-[10px] lg:text-xs italic text-neon-green font-orbitron mt-auto">
                                    ⚡ Instant warp speed to relaxation!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
