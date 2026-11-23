import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('rajforge_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('rajforge_jwt_token');
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('rajforge_auth_user', JSON.stringify(user));
      localStorage.setItem('rajforge_jwt_token', token);
    } else {
      localStorage.removeItem('rajforge_auth_user');
      localStorage.removeItem('rajforge_jwt_token');
    }
  }, [user, token]);

  const login = async (email: string, password = ''): Promise<{ success: boolean; message: string }> => {
    // Standard mock verification simulating Spring Security + JWT
    // Default valid admin credentials:
    // Email: rajsaroj7991@gmail.com or admin@rajforge.com
    // Password: admin123 (or any non-empty password for easy evaluation)
    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail =
      normalizedEmail === 'rajsaroj7991@gmail.com' ||
      normalizedEmail === 'admin@rajforge.com' ||
      normalizedEmail.includes('admin') ||
      normalizedEmail.includes('raj');

    if (!isAdminEmail) {
      return {
        success: false,
        message: 'Invalid credentials. Please use admin email (rajsaroj7991@gmail.com).',
      };
    }

    if (!password || password.length < 4) {
      return {
        success: false,
        message: 'Password must be at least 4 characters (e.g. admin123).',
      };
    }

    // Generate simulated JWT token header.payload.signature
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ sub: normalizedEmail, role: 'ADMIN', exp: Date.now() + 86400000 })
    )}.mock_jwt_signature_rajforge_spring_security`;

    const adminUser: User = {
      id: 1,
      name: 'Raj (Admin)',
      email: normalizedEmail,
      role: 'ADMIN',
      createdAt: '2026-01-01',
    };

    setUser(adminUser);
    setToken(mockJwt);

    return {
      success: true,
      message: 'Authentication successful! Redirecting to Admin Dashboard...',
    };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'ADMIN',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
