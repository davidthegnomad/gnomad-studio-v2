import React from 'react';
import Header from './Header';
import { Pizza, Utensils, Award } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#121212] text-[#F1FAEE] font-sans selection:bg-[#E63946] pb-[140px] md:pb-0">
            <Header />

            {/* Hero Section */}
            <section className="relative py-32 md:py-48 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                        A MUSKOGEE STAPLE <span className="text-[#E63946]">SINCE 1992.</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-[#FFB703] font-bold tracking-[0.2em] uppercase">Quality You Can Taste</h2>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl leading-relaxed text-green-500 mb-12 border-l-4 border-[#E63946] pl-6 italic">
                    At Pisanos, we believe in perfecting the classics. A local fixture for over 30 years, our kitchen focuses on what truly matters: a signature crispy crust, garden-fresh toppings, and a rich, flavorful sauce that has kept Muskogee coming back for more since 1992.
                </p>

                <p className="text-lg leading-relaxed text-[#F1FAEE]/60 mb-16">
                    We don't believe in overwhelming you with a massive menu—just simple ingredients, time-tested recipes, and world-class flavor.
                </p>

                {/* Known For Grid */}
                <h3 className="text-3xl font-black mb-12 text-center">WHAT WE'RE KNOWN FOR</h3>
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Award className="text-[#FFB703] mb-4" size={40} />
                        <h4 className="text-xl font-bold mb-2">The Alpine Pizza</h4>
                        <p className="text-sm text-[#F1FAEE]/60">A cult favorite and a global contender for "Best Pizza."</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Pizza className="text-[#E63946] mb-4" size={40} />
                        <h4 className="text-xl font-bold mb-2">Hand-Stuffed Calzones</h4>
                        <p className="text-sm text-[#F1FAEE]/60">Golden-brown and packed with savory fillings.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <Utensils className="text-green-500 mb-4" size={40} />
                        <h4 className="text-xl font-bold mb-2">The Salad Bar</h4>
                        <p className="text-sm text-[#F1FAEE]/60">Always fresh, crisp, and the perfect pizza companion.</p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center bg-white/5 p-12 rounded-3xl border border-white/10">
                    <p className="text-xl mb-8">
                        Visit us at <span className="text-[#E63946] font-bold">102 N 2nd St</span>. We’ve been serving our community with a smile for decades, and we’ll have a table waiting for you.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="/menu" className="border-2 border-[#F1FAEE] hover:bg-[#F1FAEE] hover:text-[#121212] px-8 py-3 rounded-full font-bold transition-all uppercase tracking-widest">
                            View Menu
                        </a>
                        <button className="bg-[#E63946] hover:bg-[#d62839] text-white px-8 py-3 rounded-full font-bold transition-all uppercase tracking-widest shadow-lg">
                            Order Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
