
import React from 'react';

interface StepProps {
  icon: string;
  title: string;
  description: string;
  stepNumber: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description, stepNumber }) => (
  <div className="relative z-10 p-6 flex flex-col items-center md:items-start text-center md:text-left group">
    <div className="size-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    <span className="mt-4 text-xs font-bold text-primary tracking-widest uppercase">{stepNumber}</span>
  </div>
);

const Process: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-primary/5 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">The Journey from Ranch to Freezer</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Follow the step-by-step process of our cow-share program, from your initial selection to the final delivery.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-primary/20 z-0"></div>
          
          <Step 
            icon="shopping_cart"
            title="Choose Your Share"
            description="Select 1/4, 1/2, or a whole cow share depending on your household needs."
            stepNumber="Step 01"
          />
          <Step 
            icon="description"
            title="Ownership Transfer"
            description="Receive your legal bill of sale and official ownership documentation for your animal."
            stepNumber="Step 02"
          />
          <Step 
            icon="content_cut"
            title="Custom Processing"
            description="Tailored cuts processed to your exact specifications by our artisan butchers."
            stepNumber="Step 03"
          />
          <Step 
            icon="kitchen"
            title="Your Freezer"
            description="High-quality beef delivered ready for your kitchen. Pure, clean, and delicious."
            stepNumber="Step 04"
          />
        </div>
      </div>
    </section>
  );
};

export default Process;
