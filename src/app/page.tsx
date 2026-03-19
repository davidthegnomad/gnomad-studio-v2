"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LaptopShowcase from "@/components/LaptopShowcase";
import Mission from "@/components/Mission";
import Packages from "@/components/Packages";
import Founder from "@/components/Founder";
import ContactGrid from "@/components/ContactGrid";
import Footer from "@/components/Footer";
import MobileDispatch from "@/components/MobileDispatch";
import CommunicationHub from "@/components/CommunicationHub";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white pb-24 md:pb-0">
      <Navigation />
      <Hero />
      <LaptopShowcase />
      <Mission />
      <Packages />
      <Founder />
      <ContactGrid />
      <Footer />
      <MobileDispatch />
      <CommunicationHub />
    </div>
  );
}
