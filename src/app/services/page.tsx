"use client";

import Navigation from "@/components/Navigation";
import Packages from "@/components/Packages";
import ContactGrid from "@/components/ContactGrid";
import Footer from "@/components/Footer";
import CommunicationHub from "@/components/CommunicationHub";
import { motion } from "framer-motion";
import { Globe, Search, BarChart3, Smartphone, Palette, ShoppingCart, Heart } from "lucide-react";

const serviceDetails = [
    {
        icon: <Globe className="w-8 h-8 text-blue-400" />,
        title: "Professional Website",
        explanation: "Think of your website as your business's permanent home on the internet. While a Facebook or Instagram page is like renting space on someone else's land, a website is a property you own. It tells customers you are serious, professional, and here to stay.",
        color: "from-blue-500/20 to-transparent"
    },
    {
        icon: <Search className="w-8 h-8 text-teal-400" />,
        title: "SEO (Search Engine Optimization)",
        explanation: "SEO stands for Search Engine Optimization. In simple terms, it's the 'secret sauce' that helps Google find your business. When someone in Muskogee searches for 'haircut' or 'landscaping,' we do the work behind the scenes to make sure your name shows up at the top of the list.",
        color: "from-teal-500/20 to-transparent"
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
        title: "Business Analysis & Guidance",
        explanation: "We don't just build a site and leave. We look at your business like a partner would. We help you find ways to save time (like online booking) or make more money (like adding an online store), giving you a roadmap for growth.",
        color: "from-emerald-500/20 to-transparent"
    },
    {
        icon: <Smartphone className="w-8 h-8 text-purple-400" />,
        title: "Mobile-First Design",
        explanation: "Did you know that 8 out of 10 people will look for your business on their phone first? 'Mobile-First' means we build your site specifically to look and work perfectly on a small screen, making it super easy for customers to find what they need while they're on the go.",
        color: "from-purple-500/20 to-transparent"
    },
    {
        icon: <Palette className="w-8 h-8 text-pink-400" />,
        title: "Branding & Logo Design",
        explanation: "Your brand is your business's personality. We help you create a professional logo and a consistent look (colors, fonts, and style) that makes people trust you before they even speak to you.",
        color: "from-pink-500/20 to-transparent"
    },
    {
        icon: <ShoppingCart className="w-8 h-8 text-amber-400" />,
        title: "E-Commerce (Online Store)",
        explanation: "E-Commerce is just a fancy word for 'selling things online.' Whether you're selling physical products, digital downloads, or booking services, we set up a system that lets you take payments and manage orders easily, 24 hours a day.",
        color: "from-amber-500/20 to-transparent"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-32">
                {/* Hero Section */}
                <section className="px-6 mb-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight mb-8"
                        >
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary animate-shimmer bg-[length:200%_auto]">Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            High-end digital tools for Muskogee small businesses. Simple language, powerful results.
                        </motion.p>
                    </div>
                </section>

                {/* Tiers Section */}
                <Packages showGradientBackground={true} />

                {/* In-Depth Section */}
                <section className="py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">A Closer Look</h2>
                            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.4em]">In-Depth Service Breakdown</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceDetails.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`glass-panel p-8 rounded-[2.5rem] border-white/5 bg-gradient-to-br ${service.color} hover:border-white/10 transition-colors group`}
                                >
                                    <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {service.explanation}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Non-Profit Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mt-24 glass-panel p-10 rounded-[3rem] border-brand-primary/20 bg-gradient-to-r from-[#0d151c] to-[#2a1b18] max-w-4xl mx-auto text-center relative overflow-hidden"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl rotate-12" />

                            <Heart className="w-12 h-12 text-brand-primary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,191,200,0.5)]" />
                            <h3 className="text-2xl font-bold mb-4">Gnomad Studio is a 501(c)(3) Non-Profit</h3>
                            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                <strong>501(c)(3)</strong> is a special status given by the government to groups that work to help others.
                                Because we are a non-profit, our mission is to help <strong>you</strong> grow. We use our skills to make sure
                                every Muskogee business has the same advantage as the big guys.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <ContactGrid />
                <Footer />
            </main>
            <CommunicationHub />
        </div>
    );
}
