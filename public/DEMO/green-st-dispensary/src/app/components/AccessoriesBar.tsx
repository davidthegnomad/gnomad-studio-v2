import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export function AccessoriesBar() {
    return (
        <section className="relative z-10 py-6 px-4 bg-neon-green/10 border-y border-neon-green/30 overflow-hidden font-orbitron">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.5)_0%,transparent_100%)]"></div>
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <Flame className="text-neon-green drop-shadow-neon" size={32} />
                    <h3 className="text-xl md:text-2xl text-white font-bold tracking-wider text-shadow-neon">
                        WE STOCK A FULL SELECTION OF SMOKING ACCESSORIES
                    </h3>
                    <p className="text-neon-green/80 text-sm md:text-base md:ml-4 italic mt-2 md:mt-0">
                        Glass, Papers, Batteries & More
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
