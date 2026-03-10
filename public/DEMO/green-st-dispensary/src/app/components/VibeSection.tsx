import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VibeSection() {
    return (
        <section id="vibe" className="relative z-10 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="rounded-2xl p-12 md:p-16 relative overflow-hidden neon-card-strong"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-10">
                        <ImageWithFallback
                            src="/DEMO/shared-images/green_st_vibe_neon.webp"
                            alt="Neon lights"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl mb-8 font-bungee bg-gradient-to-b from-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
                            THE VIBE
                        </h2>

                        <div className="text-6xl mb-6">☮️✨🌿</div>

                        <p className="text-2xl md:text-3xl mb-6 italic text-neon-green font-orbitron">
                            "It's like 'Cheers' for the cannabis community."
                        </p>

                        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed font-orbitron">
                            At Green ST., you're not just a customer—you're family. Our friendly, knowledgeable staff (shout-out to fan-favorite <span className="text-neon-green">Wendy</span>!) creates a laid-back atmosphere where everyone feels welcome.
                        </p>

                        <p className="text-3xl md:text-4xl text-neon-green text-shadow-neon font-orbitron font-bold">
                            Come for the bud, stay for the vibes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
