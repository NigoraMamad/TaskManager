// hooks/auth-context.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserInfo = {
  id:number;
  fullName: string;
  phoneNumber: string;
  role?: string;
};

type AuthContextType = {
  token: string | null;
  user: UserInfo | null;
  saveToken: (token: string) => void;
  saveUserInfo: (user: UserInfo) => void;
  clearToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') setToken(event.newValue);
      if (event.key === 'userInfo') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  const saveUserInfo = (user: UserInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setUser(user);
  };

  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, saveToken, saveUserInfo, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
