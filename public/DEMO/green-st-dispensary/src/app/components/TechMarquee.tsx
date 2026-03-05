import { motion } from 'motion/react';

export function TechMarquee() {
    const farms = [
        "Grow Happy Farms",
        "Green Dynasty Farms",
        "Stability Cannabis",
        "Heartland Farms",
        "Hicksford Farms",
        "7 Leaf",
        "Rosebuds Cannabis Co.",
        "Happy Hippy Farms",
        "Afterhours Farm",
        "Mystik Farms"
    ];

    return (
        <section className="relative z-10 bg-gradient-to-r from-black via-neon-green/10 to-black border-y border-neon-green/20 py-8 overflow-hidden font-orbitron">
            {/* Gradient masks for fading edges */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20"></div>
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20"></div>

            <p className="text-center text-neon-green/80 text-sm tracking-widest font-bold mb-4">OUR TRUSTED FARMS</p>

            <div className="flex w-[200%] gap-12">
                <motion.div
                    animate={{ x: [0, -100 + "%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex shrink-0 gap-16 items-center flex-nowrap min-w-full"
                >
                    {farms.map((farm, index) => (
                        <div key={index} className="flex items-center gap-16 whitespace-nowrap">
                            <span className="text-2xl font-bold text-gray-400 hover:text-neon-green transition-colors hover:drop-shadow-neon cursor-default">
                                {farm}
                            </span>
                            <span className="text-neon-green/30 text-xl font-bold">🛸</span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    animate={{ x: [0, -100 + "%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex shrink-0 gap-16 items-center flex-nowrap min-w-full"
                >
                    {farms.map((farm, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-16 whitespace-nowrap">
                            <span className="text-2xl font-bold text-gray-400 hover:text-neon-green transition-colors hover:drop-shadow-neon cursor-default">
                                {farm}
                            </span>
                            <span className="text-neon-green/30 text-xl font-bold">🛸</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
