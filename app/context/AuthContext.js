// app/context/AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// Dummy default export to satisfy Expo's requirements
export default function AuthContextWrapper() {
  return null;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [userData, onboardingStatus] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('hasSeenOnboarding')
      ]);
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
      
      if (onboardingStatus) {
        setHasSeenOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      // Mock authentication - In production, call your API here
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role, // 'customer', 'rider', 'company', 'admin'
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        createdAt: new Date().toISOString()
      };

      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const switchRole = async (newRole) => {
    // Development helper to switch roles
    if (user) {
      const updatedUser = { ...user, role: newRole };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasSeenOnboarding,
        login,
        logout,
        completeOnboarding,
        switchRole,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};