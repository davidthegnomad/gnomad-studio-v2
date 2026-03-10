import { AgeGate } from './components/AgeGate';
import { Header } from './components/Header';
import { SpecialsTicker } from './components/SpecialsTicker';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { AccessoriesBar } from './components/AccessoriesBar';
import { MenuHighlights } from './components/MenuHighlights';
import { VibeSection } from './components/VibeSection';
import { Footer } from './components/Footer';
import { MobileFooter } from './components/MobileFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-orbitron">
      {/* Age Verification Gate */}
      <AgeGate />

      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 animate-scanline bg-crt-scanline"></div>

      {/* Grainy Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] bg-noise-texture"></div>

      <Header />
      <Hero />
      <TechMarquee />
      <AccessoriesBar />
      <MenuHighlights />
      <SpecialsTicker />
      <VibeSection />
      <Footer />
      <MobileFooter />
      {/* Spacer for mobile footer */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
}
