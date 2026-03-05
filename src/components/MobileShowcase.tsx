"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const mobileItems = [
    {
        name: "Champion Mobile",
        image: "/examples/mobile/champion.webp",
        delay: 0.1
    },
    {
        name: "Grass Monkey",
        image: "/examples/mobile/grass_monkey.webp",
        delay: 0.3
    },
    {
        name: "Okie Paws",
        image: "/examples/mobile/okie_paws.webp",
        delay: 0.5
    }
];

export default function MobileShowcase() {
    return (
        <section className="py-24 px-4 bg-white/[0.01] hidden md:block">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Mobile-First{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500">Engineering.</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black tracking-[0.3em] uppercase mb-10">Optimized for Conversion</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
                        <div className="glass-panel rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden group h-56 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
                            {/* Base Content */}
                            <div className="flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-10">
                                <div className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500 text-5xl md:text-6xl font-black mb-2">64%</div>
                                <div className="text-white font-bold tracking-widest uppercase text-xs md:text-sm">Mobile Traffic</div>
                            </div>

                            {/* Hover Details */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center text-center bg-gradient-to-t from-black via-black/80 to-transparent">
                                <p className="text-gray-300 text-sm leading-relaxed">Of all web traffic is now generated from mobile devices.</p>
                            </div>
                        </div>

                        <div className="glass-panel rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden group h-56 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
                            {/* Base Content */}
                            <div className="flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-10">
                                <div className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500 text-5xl md:text-6xl font-black mb-2">65%</div>
                                <div className="text-white font-bold tracking-widest uppercase text-xs md:text-sm">New Customers</div>
                            </div>

                            {/* Hover Details */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center text-center bg-gradient-to-t from-black via-black/80 to-transparent">
                                <p className="text-gray-300 text-sm leading-relaxed">Of new customers will view a business website on their mobile device first.</p>
                            </div>
                        </div>

                        <div className="glass-panel rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden group h-56 flex flex-col items-center justify-center hover:bg-white/[0.04] transition-colors">
                            {/* Base Content */}
                            <div className="flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-10">
                                <div className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-500 text-5xl md:text-6xl font-black mb-2">78%</div>
                                <div className="text-white font-bold tracking-widest uppercase text-xs md:text-sm">Window Shop</div>
                            </div>

                            {/* Hover Details */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center text-center bg-gradient-to-t from-black via-black/80 to-transparent">
                                <p className="text-gray-300 text-sm leading-relaxed">Of customers &quot;window shop&quot; on mobile but may switch to desktop to pay.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {mobileItems.map((item) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            className="relative mx-auto w-full max-w-[340px]"
                        >
                            {/* Phone Frame */}
                            <div className="relative aspect-[9/19.5] w-full bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/5">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-800 rounded-b-2xl z-40" />

                                {/* Screen content */}
                                <div className="w-full h-full overflow-y-auto overflow-x-hidden relative scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                    <div className="w-full h-fit">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={800}
                                            height={5000}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Gloss reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-20 pointer-events-none z-30" />
                            </div>

                            {/* Decorative buttons on frame */}
                            <div className="absolute left-[-10px] top-24 w-1 h-12 bg-zinc-800 rounded-r-lg" />
                            <div className="absolute left-[-10px] top-40 w-1 h-8 bg-zinc-800 rounded-r-lg" />
                            <div className="absolute right-[-10px] top-32 w-1 h-14 bg-zinc-800 rounded-l-lg" />

                            <div className="mt-6 text-center">
                                <span className="text-xs font-black tracking-widest text-gray-500 uppercase">{item.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
