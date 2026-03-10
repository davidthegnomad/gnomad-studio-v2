import React from 'react';
import { ChefHat, Flame, MapPin, Thermometer, Clock, Pizza, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import StoreStatus from './StoreStatus';
import { useCart } from '../context/CartContext';

const SlicelineLanding = () => {
    const { addToCart, setIsSidebarOpen } = useCart();

    return (
        <div className="min-h-screen bg-[#121212] text-[#F1FAEE] font-sans selection:bg-[#E63946] relative pb-[140px] md:pb-0">
            <Header />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                {/* Placeholder for slow-motion oven video */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-[#121212]">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/Pizza Pics/Pizza_Slice_Cinematic_Close_Up.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
                        PRECISION IN <span className="text-[#E63946]">EVERY SLICE.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#F1FAEE]/80 mb-8 font-light max-w-2xl mx-auto">
                        Muskogee’s local legend. Hand-tossed dough, cold-fermented for 48 hours, topped with heritage ingredients.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/menu" className="bg-[#E63946] hover:bg-[#d62839] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 inline-block">
                            Order for Pickup
                        </Link>
                        <button className="border-2 border-[#F1FAEE] hover:bg-[#F1FAEE] hover:text-[#121212] px-8 py-4 rounded-full font-bold transition-all">
                            View Today's Specials
                        </button>
                    </div>
                </div>
            </section>

            {/* --- DIVIDER LOGO & INFO --- */}
            <section className="py-16 md:py-24 px-4 md:px-6">
                <div className="max-w-7xl mx-auto bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
                    {/* Decorative blurred blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 relative z-10 w-full">
                        <img src="/Pizza Pics/Pisanos_Logo.webp" alt="Pisanos Pizza Logo" className="w-48 md:w-80 drop-shadow-2xl opacity-100 hover:scale-105 transition-transform duration-500 shrink-0" />

                        <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-6 md:space-y-8 w-full md:w-auto">
                            <div className="w-full">
                                <h3 className="text-[#FFB703] font-bold text-sm tracking-[0.3em] mb-4 uppercase">Visit The Shop</h3>
                                <p className="text-white text-2xl md:text-4xl font-black leading-tight">
                                    102 N 2nd St<br />
                                    Muskogee, OK 74401<br />
                                    <span className="text-green-500 block mt-2">918.683.3838</span>
                                </p>
                                <div className="mt-4 flex justify-center md:justify-start">
                                    <StoreStatus />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="bg-[#E63946] hover:bg-white hover:text-[#E63946] text-white text-base md:text-lg px-8 py-4 md:px-12 md:py-5 rounded-full font-black transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_30px_rgba(230,57,70,0.5)] uppercase tracking-widest w-full md:w-auto"
                                >
                                    Order Now
                                </button>
                                <a href="tel:9186833838" className="border-2 border-white hover:bg-white hover:text-[#121212] text-white text-base md:text-lg px-8 py-4 md:px-12 md:py-5 rounded-full font-black transition-all uppercase tracking-widest flex items-center justify-center w-full md:w-auto">
                                    Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR MOST POPULAR ITEMS --- */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-[#FFB703] text-sm uppercase tracking-[0.3em] mb-12 text-center font-bold">Our Most Popular Items</h2>
                <div className="flex px-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {[
                        { name: "Alpine Pizza", image: "/Pizza Pics/Apline Pizza.webp", price: "$11.49", desc: "Our signature alpine loaded with flavors." },
                        { name: "Hawaiian Pizza", image: "/Pizza Pics/Hawaiin Pizza.webp", price: "$12.99", desc: "Classic combination of ham and pineapple." },
                        { name: "Pepperoni Pizza", image: "/Pizza Pics/Peperonni.webp", price: "$11.99", desc: "Loaded with premium pepperoni and mozzarella." },
                        { name: "Supreme Pizza", image: "/Pizza Pics/Supreme Pizza.webp", price: "$19.49", desc: "The works! Every topping you could want." },
                        { name: "Three Meat Pizza", image: "/Pizza Pics/three meat pizza.webp", price: "$19.49", desc: "A meat lover's paradise." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group flex flex-col min-w-[85vw] md:min-w-0 snap-center shrink-0">
                            <div className="w-full h-56 md:h-auto md:aspect-video bg-[#1A1A1A] relative overflow-hidden flex items-center justify-center p-6 shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <span className="text-[#E63946] font-mono font-bold">{item.price}</span>
                                </div>
                                <p className="text-[#F1FAEE]/60 text-sm mb-6 flex-grow">
                                    {item.desc}
                                </p>
                                <button className="w-full mt-auto border border-white/20 hover:bg-[#E63946] hover:border-[#E63946] text-white py-3 rounded-lg font-bold transition-all text-sm uppercase tracking-wider">
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SCROLLING REVIEWS --- */}
            <section className="bg-[#2A2A2A] py-8 border-y border-white/10 overflow-hidden relative">
                <div className="flex animate-scroll whitespace-nowrap gap-8">
                    {/* Render twice for seamless loop */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-8">
                            {[
                                { name: "Sarah M.", text: "Best pizza in Muskogee, hands down!" },
                                { name: "Mike R.", text: "The crust is absolutely perfection." },
                                { name: "Jessica T.", text: "Love the atmosphere and the staff." },
                                { name: "David L.", text: "A hidden gem. 10/10 would recommend." },
                                { name: "Emily K.", text: "Fresh ingredients you can taste." },
                                { name: "Chris P.", text: "Worth every penny. The Supreme is king." },
                            ].map((review, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 min-w-[300px] hover:bg-white/10 transition-colors">
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className="fill-[#FFB703] text-[#FFB703]" />)}
                                    </div>
                                    <p className="text-white/90 italic mb-4 whitespace-normal">"{review.text}"</p>
                                    <p className="text-[#E63946] font-bold text-sm uppercase tracking-wider">- {review.name}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* --- GALLERY (Placeholder) --- */}
            <section className="hidden md:block py-24 px-6 max-w-7xl mx-auto">
                <div className="columns-1 md:columns-3 gap-4 space-y-4">
                    <div className="bg-white/10 rounded-xl overflow-hidden aspect-square">
                        <img src="/Pizza Pics/Crust_Macro.webp" alt="Crust macro" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                    </div>
                    <div className="bg-white/10 rounded-xl overflow-hidden aspect-video">
                        <img src="/Pizza Pics/Crust_Toss.webp" alt="Dough tossing" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                    </div>
                    <div className="bg-white/10 rounded-xl overflow-hidden aspect-[3/4]">
                        <img src="/Pizza Pics/Supreme.webp" alt="Lifestyle shot" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-crosshair" />
                    </div>
                </div>
            </section>

            {/* --- LOCATION & MAP --- */}
            <section className="hidden md:block py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
                    <div className="p-12 flex flex-col justify-center">
                        <h2 className="text-[#E63946] text-sm uppercase tracking-[0.3em] mb-4 font-bold">Visit Us</h2>
                        <h3 className="text-4xl md:text-5xl font-black mb-6">THE HEART OF<br />DOWNTOWN.</h3>

                        {/* Review Badge */}
                        <div className="flex items-center gap-4 mb-8 bg-white/5 w-fit px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-[#FFB703] text-[#FFB703]" size={20} />)}
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-lg">4.8 Stars</span>
                                <span className="text-xs text-white/50 uppercase tracking-widest">On Google Reviews</span>
                            </div>
                        </div>

                        <p className="text-xl text-[#F1FAEE]/80 mb-8 max-w-md">
                            102 N 2nd St<br />
                            Muskogee, OK 74401<br />
                            <a href="tel:9186833838" className="text-green-500 hover:text-[#FFB703] transition-colors font-bold mt-2 inline-block">918.683.3838</a>
                        </p>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#F1FAEE]/80">
                                <div>Mon - Thu</div>
                                <div className="text-right font-mono text-[#FFB703]">11:00 AM - 08:00 PM</div>

                                <div>Fri - Sat</div>
                                <div className="text-right font-mono text-[#FFB703]">11:00 AM - 09:00 PM</div>

                                <div>Sunday</div>
                                <div className="text-right font-mono text-[#E63946]">Closed</div>
                            </div>

                            <div>
                                <button className="bg-[#E63946] hover:bg-[#d62839] text-white px-8 py-3 rounded-full font-bold transition-all w-full md:w-auto">
                                    Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] md:h-auto bg-[#121212] relative filter grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=102+N+2nd+St+Muskogee,+OK+74401&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            className="absolute inset-0 w-full h-full"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default SlicelineLanding;
