import React, { useState } from 'react';
import { ArrowRight, Wrench, Calendar, DollarSign } from 'lucide-react';

const steps = ['Select Vehicle', 'Tire Options', 'Contact Info'];

const TireQuote: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    return (
        <section className="py-32 bg-zinc-100 relative overflow-hidden" id="quote">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Fast & Accurate</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-zinc-900 uppercase tracking-tighter">
                        Tire Quote <span className="text-zinc-400">Wizard</span>
                    </h3>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex justify-between relative z-10">
                            {steps.map((step, index) => (
                                <div key={step} className="flex flex-col items-center gap-3 bg-zinc-100 px-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-all ${currentStep > index ? 'bg-primary border-primary text-zinc-950' : currentStep === index + 1 ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-300 text-zinc-400'}`}>
                                        {index + 1}
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-widest ${currentStep >= index + 1 ? 'text-zinc-900' : 'text-zinc-400'}`}>{step}</span>
                                </div>
                            ))}
                        </div>
                        {/* Background Line */}
                        <div className="absolute top-5 left-8 right-8 h-1 bg-zinc-300 -z-0 hidden sm:block">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white p-10 md:p-16 rounded-[2rem] shadow-2xl border border-zinc-200">
                        <form>

                            {/* Step 1: Vehicle */}
                            <div className={`space-y-8 ${currentStep === 1 ? 'block' : 'hidden'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Year</label>
                                        <select title="Year" className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-6 py-4 text-zinc-900 font-bold focus:border-primary focus:ring-0 outline-none transition-colors appearance-none cursor-pointer">
                                            <option>Select Year</option>
                                            <option>2024</option>
                                            <option>2023</option>
                                            <option>2022</option>
                                            <option>2021</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Make</label>
                                        <select title="Make" className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-6 py-4 text-zinc-900 font-bold focus:border-primary focus:ring-0 outline-none transition-colors appearance-none cursor-pointer">
                                            <option>Select Make</option>
                                            <option>Ford</option>
                                            <option>Chevrolet</option>
                                            <option>Toyota</option>
                                            <option>Ram</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Options (Placeholder for demo) */}
                            <div className={`space-y-8 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { id: 'all-season', label: 'All Season', icon: Calendar },
                                        { id: 'all-terrain', label: 'All Terrain / Mud', icon: Wrench },
                                        { id: 'highway', label: 'Highway / Touring', icon: DollarSign },
                                    ].map((cat) => (
                                        <label key={cat.id} className="relative flex flex-col items-center gap-4 p-6 border-2 border-zinc-200 rounded-2xl cursor-pointer hover:border-primary transition-colors bg-zinc-50">
                                            <input type="radio" name="tire_type" value={cat.id} className="peer sr-only" />
                                            <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                                            <cat.icon className="w-8 h-8 text-zinc-400 peer-checked:text-primary transition-colors" />
                                            <span className="font-black text-sm uppercase tracking-widest text-center text-zinc-600 peer-checked:text-zinc-900 transition-colors">{cat.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Contact */}
                            <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                                        <input type="text" placeholder="John Doe" title="Full Name" className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-6 py-4 text-zinc-900 font-bold focus:border-primary focus:ring-0 outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Phone</label>
                                        <input type="tel" placeholder="(918) 000-0000" title="Phone Number" className="w-full bg-zinc-50 border-2 border-zinc-200 rounded-xl px-6 py-4 text-zinc-900 font-bold focus:border-primary focus:ring-0 outline-none transition-colors" />
                                    </div>
                                </div>
                                {/* Honeypot */}
                                <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} />
                            </div>

                            {/* Actions */}
                            <div className="mt-12 flex justify-end gap-4 border-t border-zinc-200 pt-8">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-8 py-4 font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                {currentStep < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        className="bg-zinc-900 hover:bg-black text-white px-10 py-4 font-black text-lg uppercase tracking-widest rounded-xl flex items-center gap-3 transition-colors shadow-xl"
                                    >
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-orange-500 text-zinc-950 px-10 py-4 font-black text-lg uppercase tracking-widest rounded-xl border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl shadow-primary/30 flex items-center gap-3"
                                    >
                                        Get Accurate Price
                                    </button>
                                )}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TireQuote;
