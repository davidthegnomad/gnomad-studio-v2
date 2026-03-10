export interface DemoSiteConfig {
    id: string;
    name: string;
    category: string;
    description: string;
    colors: {
        primary: string;
        secondary?: string;
        backgroundLight: string;
        backgroundDark: string;
        accent?: string;
    };
    fonts: {
        display: string;
        sans: string;
    };
    hero: {
        title: string;
        subtitle: string;
        image: string;
        backgroundImage?: string;
    };
    features: {
        hasPanicButton?: boolean;
        hasQuoteWizard?: boolean;
        hasBooking?: boolean;
    };
}

export const DEMO_SITES: Record<string, DemoSiteConfig> = {
    'champion-car-detailing': {
        id: 'champion-car-detailing',
        name: 'Champion Mobile Detail',
        category: 'Automotive',
        description: 'High-octane service site for auto detailing with premium mobile-first aesthetics.',
        colors: {
            primary: '#1E293B',
            backgroundLight: '#F8FAFC',
            backgroundDark: '#0F172A',
        },
        fonts: { display: 'Space Grotesk', sans: 'Inter' },
        hero: {
            title: 'Muskogee\'s Elite Mobile Detailing',
            subtitle: 'Professional-grade showroom transformation for your luxury vehicle. We bring our own water and power to your driveway.',
            image: '/showcase/champion-car-detailing/hero.webp',
        },
        features: { hasBooking: true }
    },
    'cutting-edge-lawn-service': {
        id: 'cutting-edge-lawn-service',
        name: 'Cutting Edge Lawn',
        category: 'Outdoor Services',
        description: 'Elite landscaping and lawn maintenance service with high-conversion instant estimate flows.',
        colors: {
            primary: '#4CAF50',
            backgroundLight: '#F9FBF9',
            backgroundDark: '#1B221B',
        },
        fonts: { display: 'Manrope', sans: 'Manrope' },
        hero: {
            title: 'A Total Transformation.',
            subtitle: 'Muskogee\'s most reliable lawn and tree care. Precision mowing and expert tree removal delivered with excellence.',
            image: '/showcase/cutting-edge-lawn-service/hero.webp',
        },
        features: { hasQuoteWizard: true }
    },
    'doggie-doo-mobile-grooming': {
        id: 'doggie-doo-mobile-grooming',
        name: 'Doggie Doo Grooming',
        category: 'Pet Services',
        description: 'Premium mobile spa for Doodles and all-breed care. Cage-free, stress-free, driveway-direct.',
        colors: {
            primary: '#000080',
            backgroundLight: '#F5F5F8',
            backgroundDark: '#0F0F23',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Better Grooming, Delivered to Your Door.',
            subtitle: 'Premium mobile pet grooming for Doodles & all breeds. No kennels, no stress, no hassle.',
            image: '/showcase/doggie-doo-mobile-grooming/hero.webp',
        },
        features: { hasBooking: true }
    },
    'elevate-n-print': {
        id: 'elevate-n-print',
        name: 'Elevate N Print',
        category: 'Printing & Design',
        description: 'Industrial-grade printing and branding platform with tactical quote engine.',
        colors: {
            primary: '#333333',
            backgroundLight: '#F5F5F5',
            backgroundDark: '#1A1A1A',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Elevate Your Brand.',
            subtitle: 'Muskogee’s premier choice for expert screen printing and embroidery. High-fidelity branding that lasts.',
            image: '/showcase/elevate-n-print/hero.webp',
        },
        features: { hasQuoteWizard: true }
    },
    'grass-monkey-landscaping': {
        id: 'grass-monkey-landscaping',
        name: 'Grass Monkey Landscaping',
        category: 'Service Industry',
        description: 'Modern lead-gen platform with lush emerald aesthetics and dynamic estimate flow.',
        colors: {
            primary: '#10B981',
            backgroundLight: '#F0FDF4',
            backgroundDark: '#064E3B',
        },
        fonts: { display: 'Manrope', sans: 'Manrope' },
        hero: {
            title: 'Muskogee\'s #1 Weekly Lawn Care',
            subtitle: 'Reliable lawn maintenance for homeowners and businesses. We show up every single week, guaranteed.',
            image: '/showcase/grass-monkey-landscaping/hero.webp',
        },
        features: { hasQuoteWizard: true }
    },
    'green-st-dispensary': {
        id: 'green-st-dispensary',
        name: 'Green St Dispensary',
        category: 'Dispensary',
        description: 'Modern dispensary interface with high-impact visual design and bright green accents.',
        colors: {
            primary: '#22C55E',
            backgroundLight: '#F0FDF4',
            backgroundDark: '#052E16',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'The Green St Experience',
            subtitle: 'Premium cannabis selection and expert guidance in a modern, welcoming environment.',
            image: 'https://images.unsplash.com/photo-1645356133268-d25760d7c6e7?auto=format&fit=crop&q=80&w=1200',
        },
        features: { hasBooking: false }
    },
    'harrison-tire': {
        id: 'harrison-tire',
        name: 'Harrison Tire & Supply',
        category: 'Automotive',
        description: 'Industrial-grade auto repair and tire center with a mission-critical tactical quoting engine.',
        colors: {
            primary: '#F97316',
            backgroundLight: '#F8FAFC',
            backgroundDark: '#0F172A',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Built For The Road.',
            subtitle: 'Muskogee\'s destination for Michelin, Goodyear, and heavy-duty truck tires. Commercial fleets welcome.',
            image: '/showcase/harrison-tire/hero.webp',
        },
        features: { hasQuoteWizard: true }
    },
    'muskogee-bail-bonds': {
        id: 'muskogee-bail-bonds',
        name: 'Muskogee Bail Bonds',
        category: 'Emergency Services',
        description: 'Mission-critical emergency service portal with rapid-action Panic Button.',
        colors: {
            primary: '#E11D48',
            backgroundLight: '#FFFFFF',
            backgroundDark: '#0F172A',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Fast. Discreet. Professional.',
            subtitle: '24/7 Emergency Bail Bonds for Muskogee County. Because life doesn\'t wait.',
            image: '/showcase/muskogee-bail-bonds/hero.webp',
        },
        features: { hasPanicButton: true }
    },
    'muskogee-tree-care': {
        id: 'muskogee-tree-care',
        name: 'Muskogee Tree Care',
        category: 'Outdoor Services',
        description: 'Professional tree service site with service area targeting and lead capture.',
        colors: {
            primary: '#15803D',
            backgroundLight: '#F0FDF4',
            backgroundDark: '#14532D',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Expert Tree Care Solutions.',
            subtitle: 'Safely handling Muskogee\'s most difficult removals and precise trimming for over 20 years.',
            image: '/showcase/muskogee-tree-care/hero.webp',
        },
        features: { hasQuoteWizard: true }
    },
    'tucker-photography': {
        id: 'tucker-photography',
        name: 'Tucker Photography',
        category: 'Photography',
        description: 'Premier wedding and portrait photography with cinematic storytelling and timeless aesthetics.',
        colors: {
            primary: '#D4A032',
            backgroundLight: '#F5E6C8',
            backgroundDark: '#120D07',
        },
        fonts: { display: 'Manrope', sans: 'Manrope' },
        hero: {
            title: 'Timeless Storytelling.',
            subtitle: 'Preserving your most cherished memories with an artistic touch. Muskogee\'s premier choice for weddings and portraits.',
            image: '/showcase/tucker-photography/hero.webp',
        },
        features: { hasBooking: true }
    },
    'okie-paws': {
        id: 'okie-paws',
        name: 'Okie Paws',
        category: 'Pet Services',
        description: 'Fast, playful web store for a local dog grooming business with booking integration.',
        colors: {
            primary: '#CF8E9B',
            backgroundLight: '#F5F0E6',
            backgroundDark: '#412924',
        },
        fonts: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans' },
        hero: {
            title: 'Stress-Free Boutique Grooming',
            subtitle: 'Experience the Signature Spa difference. Our gentle approach ensures your dog leaves feeling refreshed, not rushed.',
            image: '/showcase/okie-paws/hero_flower_dog.webp',
            backgroundImage: '/showcase/okie-paws/section_bg.png',
        },
        features: { hasBooking: true }
    },
    'paradise-donuts-muskogee': {
        id: 'paradise-donuts-muskogee',
        name: 'Paradise Donuts Muskogee',
        category: 'Bakery / Retail',
        description: 'Fresh, high-performance bakery interface with cinematic visuals and glassmorphism.',
        colors: {
            primary: '#F43F5E',
            backgroundLight: '#FFF1F2',
            backgroundDark: '#4C0519',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Hand-Crafted Since 5 AM',
            subtitle: 'Experience Muskogee\'s favorite morning tradition. Hand-crafted, non-greasy donuts since 1967.',
            image: '/showcase/paradise-donuts-muskogee/hero.webp',
        },
        features: { hasBooking: false }
    },
    'so-fetch': {
        id: 'so-fetch',
        name: 'So Fetch Grooming',
        category: 'Pet Services',
        description: 'Vibrant, mobile-first grooming experience with high-conversion booking.',
        colors: {
            primary: '#9333EA',
            backgroundLight: '#FAF5FF',
            backgroundDark: '#3B0764',
        },
        fonts: { display: 'Inter', sans: 'Inter' },
        hero: {
            title: 'Make Them Look So Fetch.',
            subtitle: 'Elevated grooming for the modern dog. Breed-standard cuts and a calm, cage-free environment.',
            image: 'https://images.unsplash.com/photo-1595535372338-b7cf2518e388?auto=format&fit=crop&q=80&w=1200',
        },
        features: { hasBooking: true }
    }
};
