import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

const PizzaModal = ({ isOpen, onClose, pizza, size, price, onConfirm, availableToppings = [] }) => {
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [error, setError] = useState(null);

    // Parse allowed toppings count from name (e.g., "2 Topping Pizza" -> 2)
    const allowedToppings = (() => {
        if (!pizza) return 0;
        const match = pizza.Item.match(/(\d+)\s+Topping/i);
        return match ? parseInt(match[1]) : 0;
    })();

    const isUnlimited = false; // Could allow unlimited for "Build Your Own" later

    useEffect(() => {
        if (isOpen) {
            setSelectedToppings([]);
            setError(null);
        }
    }, [isOpen, pizza]);

    if (!isOpen || !pizza) return null;

    const handleToppingToggle = (topping) => {
        if (selectedToppings.includes(topping)) {
            setSelectedToppings(prev => prev.filter(t => t !== topping));
            setError(null);
        } else {
            if (!isUnlimited && selectedToppings.length >= allowedToppings) {
                setError(`You can only choose ${allowedToppings} toppings!`);
                // Shake animation effect could go here
                return;
            }
            setSelectedToppings(prev => [...prev, topping]);
            setError(null);
        }
    };

    const handleConfirm = () => {
        if (!isUnlimited && selectedToppings.length !== allowedToppings) {
            setError(`Please select exactly ${allowedToppings} toppings.`);
            return;
        }

        onConfirm({
            ...pizza,
            displayToppings: selectedToppings
        }, size, price);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-[#121212] border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-[#121212] shrink-0">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h2 className="text-2xl font-black uppercase text-[#F1FAEE]">{pizza.Item}</h2>
                            <p className="text-[#FFB703] font-mono">{size} • {price}</p>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} className="text-white" />
                        </button>
                    </div>
                    <p className="text-sm text-white/60">
                        Select <span className="text-[#E63946] font-bold">{allowedToppings}</span> toppings.
                    </p>
                </div>

                {/* Toppings Grid - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        {availableToppings.map((t) => {
                            const topping = t.Topping;
                            const isSelected = selectedToppings.includes(topping);
                            return (
                                <button
                                    key={topping}
                                    onClick={() => handleToppingToggle(topping)}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isSelected
                                        ? 'bg-[#E63946] border-[#E63946] text-white'
                                        : 'bg-white/5 border-white/10 text-[#F1FAEE] hover:bg-white/10'
                                        }`}
                                >
                                    <span className="font-bold text-sm">{topping}</span>
                                    {isSelected && <Check size={16} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="p-6 border-t border-white/10 bg-[#121212] shrink-0">
                    <button
                        onClick={handleConfirm}
                        disabled={!isUnlimited && selectedToppings.length !== allowedToppings}
                        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${(!isUnlimited && selectedToppings.length !== allowedToppings)
                            ? 'bg-white/10 text-white/30 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600 text-white shadow-lg lg:hover:scale-[1.02]'
                            }`}
                    >
                        Add to Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PizzaModal;
