import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NeighborhoodDiscount from './components/NeighborhoodDiscount';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import Commercial from './components/Commercial';
import ServiceArea from './components/ServiceArea';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import EstimateFlow from './components/EstimateFlow';
import ClientPortal from './components/ClientPortal';

export default function App() {
    const [isEstimateOpen, setIsEstimateOpen] = useState(false);
    const [isPortalOpen, setIsPortalOpen] = useState(false);

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
            <Header onPortalClick={() => setIsPortalOpen(true)} />
            <NeighborhoodDiscount onEstimateClick={() => setIsEstimateOpen(true)} />
            <main className="flex-grow">
                <Hero onEstimateClick={() => setIsEstimateOpen(true)} />
                <TrustBar />
                <Services />
                <Commercial />
                <ServiceArea />
                <Testimonials />
            </main>
            <Footer />
            <MobileNav />

            <EstimateFlow isOpen={isEstimateOpen} onClose={() => setIsEstimateOpen(false)} />
            <ClientPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
        </div>
    );
}
