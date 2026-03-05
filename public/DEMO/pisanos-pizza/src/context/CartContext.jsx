import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('pisanos_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            return [];
        }
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('pisanos_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item, size, price) => {
        setCart(prevCart => {
            // Create a unique ID for this instance based on item and options
            const sortedToppings = item.displayToppings ? [...item.displayToppings].sort().join(',') : '';
            const existingItemIndex = prevCart.findIndex(
                cartItem => cartItem.name === item.Item
                    && cartItem.size === size
                    && (cartItem.selectedToppings || '') === sortedToppings
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += 1;
                return newCart;
            }

            return [...prevCart, {
                id: Date.now(), // simple unique id
                name: item.Item,
                size: size,
                price: parseFloat(price.replace('$', '')),
                quantity: 1,
                category: item.category,
                selectedToppings: sortedToppings
            }];
        });
        setIsSidebarOpen(true); // Open sidebar on add
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === itemId) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isSidebarOpen,
            setIsSidebarOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
