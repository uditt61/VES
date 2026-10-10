import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { setAccessToken } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on page refresh via HTTP-only refresh token cookie or storage fallback
  const checkAuth = useCallback(async () => {
    try {
      const savedRefreshToken =
        typeof window !== 'undefined' ? localStorage.getItem('ves_refresh_token') : null;
      const headers = savedRefreshToken ? { 'x-refresh-token': savedRefreshToken } : {};
      const response = await api.post(
        '/auth/refresh',
        { refreshToken: savedRefreshToken },
        { headers }
      );
      if (response.data?.success) {
        const { accessToken, refreshToken, user } = response.data.data;
        setAccessToken(accessToken);
        if (refreshToken && typeof window !== 'undefined') {
          localStorage.setItem('ves_refresh_token', refreshToken);
        }
        setUser(user);
      }
    } catch {
      // Not authenticated or refresh token expired
      setAccessToken(null);
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ves_refresh_token');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data?.success) {
        const { accessToken, refreshToken, user } = response.data.data;
        setAccessToken(accessToken);
        if (refreshToken && typeof window !== 'undefined') {
          localStorage.setItem('ves_refresh_token', refreshToken);
        }
        setUser(user);
        return user;
      }
      throw new Error(response.data?.message || 'Login failed');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? 'Invalid email or password. Please check your credentials.'
          : err.response?.status === 429
          ? 'Too many login attempts. Please try again after 15 minutes.'
          : err.message || 'Invalid email or password');
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      const savedRefreshToken =
        typeof window !== 'undefined' ? localStorage.getItem('ves_refresh_token') : null;
      await api.post('/auth/logout', { refreshToken: savedRefreshToken });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAccessToken(null);
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ves_refresh_token');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || null,
        loading,
        login,
        logout,
        checkAuth,
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
