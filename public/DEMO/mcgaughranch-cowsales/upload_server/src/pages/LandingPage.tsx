
import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Process from '@/components/landing/Process';
import CTA from '@/components/landing/CTA';

const LandingPage: React.FC = () => {
    return (
        <>
            <Hero />
            <Features />
            <Process />
            <CTA />
        </>
    );
};

export default LandingPage;
