import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from './Header';
import { ShoppingBag, ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { formatReceipt } from '../utils/receiptFormatter';

const OrderSummaryPage = () => {
    const { cart, cartTotal, addToCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const subtotal = cartTotal;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    // Hardcoded Upsells
    const UPSELLS = [
        { id: 'breadsticks', name: 'Breadsticks', price: 5.99, category: 'Side', image: '/Pizza Pics/breadsticks.webp' },
        { id: 'cheese_sticks', name: 'Cheese Sticks', price: 6.99, category: 'Side', image: '/Pizza Pics/breadsticks.webp' },
        { id: 'cookie', name: 'Choco Chip Cookie', price: 6.99, category: 'Dessert', image: '/Pizza Pics/cookie.webp' },
        { id: 'brownie', name: 'Brownie', price: 6.99, category: 'Dessert', image: '/Pizza Pics/cookie.webp' },
        { id: 'coke', name: '2L Coke', price: 3.50, category: 'Drink', image: '/Pizza Pics/soda.webp' },
        { id: 'diet_coke', name: '2L Diet Coke', price: 3.50, category: 'Drink', image: '/Pizza Pics/soda.webp' },
        { id: 'sprite', name: '2L Sprite', price: 3.50, category: 'Drink', image: '/Pizza Pics/soda.webp' },
        { id: 'dr_pepper', name: '2L Dr. Pepper', price: 3.50, category: 'Drink', image: '/Pizza Pics/soda.webp' },
        { id: 'ranch', name: 'Ranch Sauce', price: 0.75, category: 'Sauce', image: '/Pizza Pics/sauce.webp' },
        { id: 'marinara', name: 'Marinara Sauce', price: 0.75, category: 'Sauce', image: '/Pizza Pics/sauce.webp' },
        { id: 'garlic', name: 'Garlic Butter', price: 0.75, category: 'Sauce', image: '/Pizza Pics/sauce.webp' },
    ];

    const handleAddUpsell = (item) => {
        // Construct item object to match CartContext expectation
        // CartContext expects: item object with .Item property, size string, price number/string
        // The addToCart function signature is: (item, size, price)
        addToCart(
            { Item: item.name, category: item.category },
            'Regular',
            item.price.toFixed(2)
        );
    };

    // Initialize EmailJS (Replace these with your actual IDs)
    // You should move these to .env in production
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    const handleSendOrder = async (e) => {
        e.preventDefault();

        if (!customer.name || !customer.phone) {
            setErrorMessage('Name and Phone are required.');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        const receiptBody = formatReceipt(cart, customer, total);

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                to_email: 'pisanos@example.com', // Replace with printer email if needed, or configure in EmailJS template
                message: receiptBody,
                customer_name: customer.name,
                customer_phone: customer.phone,
                order_total: total.toFixed(2)
            });

            setStatus('success');
            setTimeout(clearCart, 5000); // Optional: clear cart after success
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setErrorMessage('Failed to send order. Please call the shop instead at 918.683.3838.');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#121212] text-[#F1FAEE] font-sans flex items-center justify-center p-6">
                <div className="text-center max-w-lg space-y-6">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                        <CheckCircle size={48} className="text-[#121212]" />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Order Sent!</h1>
                    <p className="text-xl text-white/80">
                        Your order has been sent to our kitchen. We'll start spinning the dough!
                    </p>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-8">
                        <p className="font-bold text-[#FFB703] uppercase tracking-widest text-sm mb-2">Estimated Pickup</p>
                        <p className="text-3xl font-mono font-bold">20-30 MIN</p>
                    </div>
                    <Link to="/" className="inline-block mt-8 text-[#E63946] font-bold uppercase tracking-widest hover:text-white transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-[#121212] text-[#F1FAEE] font-sans selection:bg-[#E63946] relative pb-20">
            <Header />

            <div className="pt-36 max-w-4xl mx-auto px-6 relative">
                <button
                    onClick={() => navigate('/menu')}
                    className="inline-flex items-center text-[#FFB703] hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-sm relative z-[60] cursor-pointer pointer-events-auto hover:bg-white/5 p-2 rounded-lg -ml-2"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Menu
                </button>

                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-12 mt-8">
                    {/* Order Details */}
                    <div className="space-y-6 order-2 md:order-1">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <ShoppingBag className="text-[#E63946]" />
                                Your Items
                            </h2>

                            {cart.length === 0 ? (
                                <div className="text-center py-10 opacity-50">
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-bold text-lg">{item.quantity}x {item.name}</div>
                                                <div className="text-[#FFB703] font-mono text-sm">{item.size}</div>
                                                {item.selectedToppings && (
                                                    <div className="text-sm text-white/50 mt-1 italic">
                                                        + {item.selectedToppings.split(',').join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-mono font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Complete Your Meal - Upsells */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-[#FFB703]">Complete Your Meal</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {UPSELLS.map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleAddUpsell(item)}
                                        className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#E63946]/50 rounded-lg transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 flex-shrink-0 bg-black/30 rounded-full p-1.5 border border-white/5">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-[#F1FAEE] group-hover:text-white leading-tight">{item.name}</div>
                                                <div className="text-xs text-white/50 font-mono">${item.price.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946] group-hover:text-white transition-colors flex-shrink-0">
                                            <span className="text-md font-bold leading-none mb-0.5">+</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                            <div className="flex justify-between text-white/70">
                                <span>Subtotal</span>
                                <span className="font-mono">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white/70">
                                <span>Tax (est. 8%)</span>
                                <span className="font-mono">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black text-white pt-4 border-t border-white/10 mt-2">
                                <span>Total</span>
                                <span className="text-[#FFB703] font-mono">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info Form */}
                    <div className="space-y-6 order-1 md:order-2">
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Your Details</h3>

                            <form onSubmit={handleSendOrder} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#E63946] focus:outline-none transition-colors"
                                        placeholder="Enter your name"
                                        value={customer.name}
                                        onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#E63946] focus:outline-none transition-colors"
                                        placeholder="(555) 555-5555"
                                        value={customer.phone}
                                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Special Instructions</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#E63946] focus:outline-none transition-colors h-24 resize-none"
                                        placeholder="Gate code, allergies, extra crispy..."
                                        value={customer.notes}
                                        onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                                    />
                                </div>

                                {errorMessage && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-3">
                                        <AlertCircle size={20} />
                                        <span className="text-sm font-bold">{errorMessage}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || cart.length === 0}
                                    className="w-full bg-[#E63946] hover:bg-[#d62839] disabled:bg-white/10 disabled:text-white/30 text-white py-5 rounded-full font-black uppercase tracking-widest shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit Order
                                            <Send size={20} />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-white/40 text-xs">
                                    Payment will be collected at the store upon pickup.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryPage;
