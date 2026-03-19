"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const showcaseItems = [
    {
        name: "Landscaping Company",
        image: "/examples/Grass_Monkey_Full_Site.webp",
        delay: 0.1,
    },
    {
        name: "Pet Groomer",
        image: "/examples/pet_example.webp",
        delay: 0.3,
    },
    {
        name: "Mobile Car Detail",
        image: "/examples/car_detail_example.webp",
        delay: 0.5,
    }
];

export default function LaptopShowcase() {
    return (
        <section className="py-24 px-4 relative overflow-hidden bg-background hidden md:block">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                        Engineered for <span className="text-brand-primary">Immersion.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto uppercase text-[10px] font-black tracking-[0.3em]">
                        High-Performance Digital Exhibits
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
                    {showcaseItems.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: item.delay, ease: "easeOut" }}
                            className="group relative"
                        >
                            {/* Laptop Wrapper */}
                            <div className="relative aspect-[16/10] w-full">
                                {/* Screen Frame */}
                                <div className="absolute inset-x-0 top-0 h-[92%] bg-zinc-900 rounded-t-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden z-20">
                                    {/* Scrollable content container */}
                                    <div className="w-full h-full overflow-hidden relative" style={{ containerType: 'size' }}>
                                        <motion.div
                                            className="w-full"
                                            initial={{ y: 0 }}
                                            whileHover={{ y: "calc(-100% + 100cqh)" }}
                                            transition={{ duration: 10, ease: "easeInOut" }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={1920}
                                                height={10000}
                                                className="w-full h-auto"
                                                priority={idx === 0}
                                            />
                                        </motion.div>
                                    </div>
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-30 pointer-events-none z-30" />
                                </div>

                                {/* Laptop Base */}
                                <div className="absolute inset-x-[-2%] bottom-0 h-[8%] bg-zinc-800 rounded-b-xl border-t border-white/5 z-10 shadow-xl" />
                                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1/4 h-1 bg-zinc-700/50 rounded-full blur-[1px] z-20" />
                            </div>

                            {/* Label */}
                            <div className="mt-8 text-center">
                                <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <div className="w-8 h-1 bg-brand-primary/20 mx-auto mt-2 rounded-full group-hover:w-16 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
