
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChatBot from '@/components/common/ChatBot';
import AuthModal from '@/components/common/AuthModal';
import LandingPage from '@/pages/LandingPage';
import SelectorPage from '@/pages/SelectorPage';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/shop" element={<SelectorPage />} />
                    </Routes>
                    <Footer />
                    <AuthModal />
                    <ChatBot />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
