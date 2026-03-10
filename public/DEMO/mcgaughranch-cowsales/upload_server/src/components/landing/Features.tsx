
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-background-dark/50 border border-primary/10 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="size-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="story" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">The McGaugh Difference</h2>
        <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon="gavel"
          title="Transparent Ownership"
          description="A secure legal model providing a formal bill of sale for your livestock share. You're not just buying food; you're acquiring a legal asset with full transparency."
        />
        <FeatureCard 
          icon="branding_watermark"
          title="Know Your Herd"
          description="The unique opportunity to name and follow the journey of your specific animal. Stay updated with growth reports and ranch activities throughout the season."
        />
        <FeatureCard 
          icon="verified"
          title="Premium Quality"
          description="Pasture-raised, hormone-free cattle raised with heritage ranching practices. Our commitment to animal welfare ensures the highest nutritional value and flavor."
        />
      </div>
    </section>
  );
};

export default Features;
