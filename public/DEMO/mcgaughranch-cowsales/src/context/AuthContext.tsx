
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const storedUser = localStorage.getItem('mcgaugh_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulating API call
    const mockUser = { email, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('mcgaugh_user', JSON.stringify(mockUser));
    setAuthModalOpen(false);
  };

  const signup = async (name: string, email: string, _password: string) => {
    // Simulating API call
    const mockUser = { email, name };
    setUser(mockUser);
    localStorage.setItem('mcgaugh_user', JSON.stringify(mockUser));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mcgaugh_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, signup, logout, 
      isAuthModalOpen, setAuthModalOpen,
      authMode, setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
