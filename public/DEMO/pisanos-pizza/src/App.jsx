import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import OrderSummaryPage from './components/OrderSummaryPage';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import MobileFooter from './components/MobileFooter';
import './index.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App relative">
                    <CartSidebar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/order" element={<OrderSummaryPage />} />
                    </Routes>
                    <Footer />
                    <MobileFooter />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
