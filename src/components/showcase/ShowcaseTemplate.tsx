"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DemoSiteConfig } from '@/config/demo-sites';
import { Phone, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';

export default function ShowcaseTemplate({ config }: { config: DemoSiteConfig }) {
    return (
        <div className="fixed inset-0 w-full h-full bg-black z-[9999]">
            <iframe
                src={`/showcase-sites/${config.id}/index.html`}
                className="w-full h-full border-none"
                title={config.name}
            />
            {/* Minimal Exit/Home button for navigation back to portal */}
            <a
                href="/demo"
                className="absolute top-4 left-4 z-[10000] px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-bold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
                <ArrowRight className="w-3 h-3 rotate-180" />
                Back to Portal
            </a>
        </div>
    );
}
