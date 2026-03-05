import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Header from './Header';
import { Pizza, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

import PizzaModal from './PizzaModal';

const MenuPage = () => {
    const [data, setData] = useState({});
    const [toppings, setToppings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Pizza');

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Menu
                const menuResponse = await fetch('https://docs.google.com/spreadsheets/d/1jlQu1nlpIjjQe7Q9j-EAthisEaaIgGD5dZj7k2CKqbY/export?format=csv');
                const menuCsv = await menuResponse.text();

                // Fetch Toppings
                const toppingsResponse = await fetch('https://docs.google.com/spreadsheets/d/1jlQu1nlpIjjQe7Q9j-EAthisEaaIgGD5dZj7k2CKqbY/export?format=csv&gid=1655461861');
                const toppingsCsv = await toppingsResponse.text();

                Papa.parse(menuCsv, {
                    complete: (menuResults) => {
                        const parsedMenu = processMenuData(menuResults.data);
                        setData(parsedMenu);

                        Papa.parse(toppingsCsv, {
                            header: true, // Auto-detect headers like "Topping,Price"
                            complete: (toppingResults) => {
                                const validToppings = toppingResults.data.filter(t => t.Topping && t.Topping.trim() !== '');
                                setToppings(validToppings);
                                setLoading(false);
                            }
                        });
                    },
                    error: (err) => {
                        setError('Failed to parse menu data');
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError('Failed to load menu data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (item, size, price) => {
        // Check if item needs verification (contains "Topping")
        if (item.Item.includes('Topping')) {
            setSelectedPizza(item);
            setSelectedSize(size);
            setSelectedPrice(price);
            setModalOpen(true);
        } else {
            addToCart(item, size, price);
        }
    };

    // ... existing processMenuData ...

    // ... existing imports/render ...

    // Replace the button onClick in the map:
    // onClick={() => handleItemClick(item, header, item[header])}


    // Custom processor for the specific CSV structure
    const processMenuData = (rows) => {
        const categories = {};
        let currentCategory = null;
        let currentHeaders = [];

        rows.forEach(row => {
            // Skip completely empty rows
            if (row.length === 0 || row.every(cell => !cell)) return;

            const firstCell = row[0]?.trim();

            // Detect Category (e.g., "Pizza", "Calizones") - usually stands alone or with empty following cells in this specific format
            // Based on the observed CSV: "Pizza,,," -> row[0] has value, others empty/undefined
            const isHeaderRow = row.slice(1).every(cell => !cell || cell.trim() === '');

            if (isHeaderRow && firstCell) {
                currentCategory = firstCell;
                categories[currentCategory] = { headers: [], items: [] };
                return;
            }

            // Detect Column Headers (e.g., "Item,Medium,Large")
            if (firstCell === 'Item') {
                if (currentCategory) {
                    // Filter out empty headers
                    categories[currentCategory].headers = row.filter(h => h && h.trim() !== '');
                }
                return;
            }

            // Normal Data Row
            if (currentCategory) {
                // Check if it's a valid item row (has a name)
                if (firstCell && firstCell !== 'Item') {
                    const item = {};
                    categories[currentCategory].headers.forEach((header, index) => {
                        item[header] = row[index];
                    });
                    categories[currentCategory].items.push(item);
                }
            }
        });

        return categories;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center text-[#F1FAEE]">
                <div className="text-center">
                    <Loader2 className="animate-spin h-12 w-12 text-[#E63946] mx-auto mb-4" />
                    <p className="text-xl font-light tracking-widest uppercase">Loading Menu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center text-[#F1FAEE]">
                <div className="text-center max-w-md px-6">
                    <AlertCircle className="h-12 w-12 text-[#E63946] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                    <p className="text-white/60 mb-6">{error}. Please check your connection or try again later.</p>
                    <a href="/" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all">
                        Return Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-[#F1FAEE] font-sans selection:bg-[#E63946] selection:text-white pb-[140px] md:pb-0">
            <Header />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 text-center bg-gradient-to-b from-[#121212] to-[#121212]/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm pointer-events-none"></div>
                <h1 className="relative text-5xl md:text-7xl font-black tracking-tighter mb-4 text-[#F1FAEE]">
                    OUR <span className="text-[#E63946]">MENU</span>
                </h1>
                <p className="relative text-[#FFB703] font-mono tracking-widest text-sm uppercase">
                    Fresh Ingredients • Hand Tossed • Made with Love
                </p>
            </section>

            {/* Category Navigation */}
            <section className="sticky top-20 z-40 bg-[#121212]/95 backdrop-blur-md border-y border-white/10 py-4 mb-12">
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                    <div className="flex justify-center min-w-max gap-4 md:gap-8">
                        {Object.keys(data).map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`text-sm md:text-base font-bold uppercase tracking-widest px-6 py-2 rounded-full transition-all ${activeCategory === category
                                    ? 'bg-[#E63946] text-white shadow-lg scale-105'
                                    : 'text-[#F1FAEE]/60 hover:text-[#F1FAEE] hover:bg-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="px-6 pb-32 max-w-5xl mx-auto min-h-[50vh]">
                {activeCategory && data[activeCategory] && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4 mb-12">
                            <Pizza className="text-[#FFB703]" />
                            <h2 className="text-3xl font-black uppercase tracking-tighter">{activeCategory}</h2>
                            <div className="h-px bg-white/10 flex-grow"></div>
                        </div>

                        <div className="grid gap-6">
                            {data[activeCategory].items.map((item, idx) => (
                                <div key={idx} className="group bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 group-hover:text-[#E63946] transition-colors">
                                                {item.Item}
                                            </h3>
                                            {/* Description isn't in this CSV, but if it were, we'd render it here */}
                                        </div>
                                        <div className="flex gap-4 md:gap-8 text-sm md:text-base">
                                            {data[activeCategory].headers.filter(h => h !== 'Item').map(header => (
                                                item[header] && (
                                                    <button
                                                        key={header}
                                                        onClick={() => handleItemClick(item, header, item[header])}
                                                        className="text-right hover:scale-110 active:scale-95 transition-transform cursor-pointer group/price"
                                                    >
                                                        <div className="text-[#F1FAEE]/40 text-xs font-mono uppercase mb-1 group-hover/price:text-[#E63946] transition-colors">{header}</div>
                                                        <div className="font-mono text-[#FFB703] font-bold bg-white/5 px-3 py-1 rounded-md group-hover/price:bg-white/10">{item[header]}</div>
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Modal */}
            <PizzaModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                pizza={selectedPizza}
                size={selectedSize}
                price={selectedPrice}
                availableToppings={toppings}
                onConfirm={(customPizza, size, price) => addToCart(customPizza, size, price)}
            />
        </div>
    );
};

export default MenuPage;
