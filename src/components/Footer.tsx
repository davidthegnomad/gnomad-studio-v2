import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-16 bg-background border-t border-white/5 px-6 pb-32 md:pb-16 hidden md:block">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
                    <div className="md:col-span-4 relative min-h-[220px] glass-panel rounded-2xl overflow-hidden border border-white/5 bg-black/20 group hover:shadow-[0_0_80px_rgba(0,191,200,0.8)] hover:border-brand-primary transition-all duration-500 cursor-pointer">
                        <Image
                            src="/assets/gnomad_logo_new.webp"
                            alt="Gnomad Studio Logo"
                            fill
                            className="object-contain mix-blend-screen drop-shadow-2xl opacity-90 p-8 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 mb-1">Gnomad Studio</span>
                            <div className="flex items-center gap-1.5 focus-within:ring-2 ring-brand-primary rounded px-2">
                                <span className="font-black text-xs tracking-widest uppercase text-brand-primary">Gnomad Studio</span>
                                <span className="bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">ORG</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li>
                                <Link href="/#mission" className="relative py-1 group hover:text-white transition-all duration-500 inline-block">
                                    <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Mission</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="relative py-1 group hover:text-white transition-all duration-500 inline-block">
                                    <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Services</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                                </Link>
                            </li>
                            <li>
                                <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="relative py-1 group hover:text-white transition-all duration-500 inline-block">
                                    <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Story</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                                </a>
                            </li>
                            <li>
                                <Link href="/examples" className="relative py-1 group hover:text-white transition-all duration-500 inline-block">
                                    <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Examples</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="relative py-1 group hover:text-white transition-all duration-500 inline-block">
                                    <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Contact</span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Our Network</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li>
                                <Link href="/client-portal" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    Client Portal
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <a href="https://gnomad.studio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    gnomad.studio
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://gnomadstudio.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 group">
                                    gnomadstudio.org
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li>
                                <a href="https://github.com/davidthegnomad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Location</h4>
                        <ul className="space-y-4 text-sm font-semibold text-gray-400">
                            <li className="font-black text-brand-primary uppercase tracking-widest text-xs">MUSKOGEE, OK</li>
                            <li>The 918 Region</li>
                            <li>Green Country</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-10 pt-8 border-t border-white/5 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-xs sm:text-sm font-black leading-relaxed tracking-wide uppercase">
                    A David The Gnomad 501(c)(3) Initiative — Engineering Muskogee&apos;s Renaissance, one business at a time.
                </p>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-6 px-2 text-brand-primary/80 text-[10px] sm:text-xs tracking-widest uppercase font-bold">
                    <p className="opacity-90">© 2026 Gnomad Studio · <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(163,83,232,0.5)]">David the Gnomad Inc.</a> All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <Link href="https://davidthegnomad.org/privacy" className="text-brand-accent hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(163,83,232,0.5)]">Privacy</Link>
                        <Link href="https://davidthegnomad.org/terms" className="text-brand-accent hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(163,83,232,0.5)]">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
