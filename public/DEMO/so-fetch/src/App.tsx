import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-background-light text-text-dark relative overflow-x-hidden">
            <div className="absolute inset-0 bg-glam-pattern pointer-events-none"></div>

            <div className="relative z-10">
                <Header />
                <main>
                    <Hero />
                    <Services />
                    <Booking />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
