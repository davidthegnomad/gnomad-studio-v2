import React from 'react';
import { ArrowRight, Star, GraduationCap, Heart } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

                    {/* Left: Copy */}
                    <div className="max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-100 text-primary text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-primary" />
                            Muskogee's Luxury Pet Spa
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight text-text-dark">
                            Make Them <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Look So Fetch.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-dark/70 leading-relaxed mb-10 font-medium max-w-xl">
                            Elevated grooming for the modern dog. We specialize in breed-standard cuts, creative styling, and a calm, cage-free environment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                            <a
                                href="#booking"
                                className="bg-primary hover:bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 group w-full sm:w-auto active:scale-95"
                            >
                                Book An Appointment
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="mt-12 flex items-center gap-8 border-t border-purple-100 pt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-bold text-text-dark/80">Master Certified</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-secondary" />
                                </div>
                                <span className="text-sm font-bold text-text-dark/80">Cage-Free Salon</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image Element */}
                    <div className="relative">
                        {/* Decorative blob behind image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[3rem] rotate-6 scale-105 blur-2xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1595535372338-b7cf2518e388?auto=format&fit=crop&q=80&w=1000"
                            alt="Beautifully groomed poodle looking fetch"
                            className="relative z-10 rounded-[2.5rem] shadow-2xl object-cover h-[500px] w-full border-[6px] border-white"
                        />

                        {/* Floating Badge */}
                        <div className="absolute -bottom-8 -left-8 z-20 bg-white p-5 rounded-3xl shadow-2xl border border-purple-50 flex items-center gap-4 animate-bounce hover:animate-none group cursor-pointer transition-all">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} className="w-12 h-12 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Happy client" />
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-sm font-black text-text-dark">150+ Happy Pups</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
