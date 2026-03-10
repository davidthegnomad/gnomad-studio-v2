import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, isSidebarOpen, setIsSidebarOpen } = useCart();
    const navigate = useNavigate();

    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Panel */}
            <div className="relative w-full max-w-md bg-[#121212] border-l border-white/10 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#121212]">
                    <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2 text-[#F1FAEE]">
                        <ShoppingBag className="text-[#E63946]" />
                        Your Order
                    </h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                            <ShoppingBag size={48} className="mb-4 text-[#FFB703]" />
                            <p className="text-lg font-bold">Your cart is empty</p>
                            <p className="text-sm">Add some pizzas to get started!</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#F1FAEE]">{item.name}</h3>
                                    <p className="text-sm text-[#FFB703] font-mono">{item.size} • ${item.price.toFixed(2)}</p>
                                    {item.selectedToppings && (
                                        <p className="text-xs text-[#F1FAEE]/60 mt-1 italic">
                                            + {item.selectedToppings.split(',').join(', ')}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col items-end justify-between gap-2">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-white/40 hover:text-[#E63946] transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="text-white/60 hover:text-white disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-mono font-bold text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="text-white/60 hover:text-white"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Totals */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-[#121212]">
                        <div className="space-y-2 mb-6 text-sm text-[#F1FAEE]/80">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-mono">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (est. 8%)</span>
                                <span className="font-mono">${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-white/10 mt-4">
                                <span>Total</span>
                                <span className="font-mono text-[#FFB703]">${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsSidebarOpen(false);
                                navigate('/order');
                            }}
                            className="w-full bg-[#E63946] hover:bg-[#d62839] text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transition-all transform hover:scale-[1.02]"
                        >
                            Review Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
