import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceArea from './components/ServiceArea';
import LeadCapture from './components/LeadCapture';
import FAQ from './components/FAQ';
import FacebookReviewBar from './components/FacebookReviewBar';
import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-background-dark text-white' : 'bg-linen text-slate-900'} transition-colors duration-500`}>
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <main>
                <Hero />
                <Services />
                <LeadCapture />
                <ServiceArea />
                <FAQ />
                <FacebookReviewBar />
            </main>

            <Footer />
            <MobileFooter />
        </div>
    );
}

export default App;
