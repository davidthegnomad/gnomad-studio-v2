export const gnomadTheme = {
    colors: {
        base: {
            background: '#0f0c15', // Deep Canvas Black
            surface: '#1e1b26', // Acrylic Dark Grey
            text: '#f3f4f6', // Titanium White
        },
        brand: {
            primary: '#6d28d9', // Acrylic Purple
            secondary: '#06b6d4', // Cyan Glaze
            accent: '#ec4899', // Magenta Stroke
        },
        tiers: {
            ma_pa: {
                primary: '#f59e0b', // Amber/Warmth
                secondary: '#fff7ed', // Paper White
            },
            main_street: {
                primary: '#3b82f6', // Trust Blue
                secondary: '#f0f9ff', // Sky White
            },
            wall_street: {
                primary: '#d4af37', // Gold Leaf
                secondary: '#111827', // Obsidian Black
            },
        },
        status: {
            success: '#10b981', // Emerald
            warning: '#fcd34d', // Sunshine
            error: '#ef4444', // Red Paint
        },
    },
    fonts: {
        heading: 'var(--font-montserrat)', // Bold, Industrial (Roofer style)
        body: 'var(--font-inter)', // Clean, Readable (Plumber style)
        script: 'var(--font-dancing-script)', // Artistic signature
    },
    spacing: {
        section: '6rem', // Spacious for art breathing room
        card: '2rem',
    },
    borderRadius: {
        card: '1rem', // Smooth edges like worn stone
        button: '9999px', // Pill for friendliness
    },
};
