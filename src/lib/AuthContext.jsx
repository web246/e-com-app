import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authApi from '@/lib/api/authService';
import { hasTokens, clearTokens } from '@/lib/api/tokenStorage';
import { getErrorMessage } from '@/lib/api/errors';

const AuthContext = createContext(null);

const OTP_PASSWORD_KEY = 'dm_otp_password';

export function stashOtpPassword(password) {
  try {
    sessionStorage.setItem(OTP_PASSWORD_KEY, password || '');
  } catch {
    // ignore storage failures
  }
}

export function takeOtpPassword() {
  try {
    const value = sessionStorage.getItem(OTP_PASSWORD_KEY) || '';
    sessionStorage.removeItem(OTP_PASSWORD_KEY);
    return value;
  } catch {
    return '';
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const refreshUser = useCallback(async () => {
    if (!hasTokens()) {
      setUser(null);
      return null;
    }
    const me = await authApi.getMe();
    setUser(me);
    return me;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (hasTokens()) await refreshUser();
        else setUser(null);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setAuthChecked(true);
        setIsLoadingAuth(false);
      }
    })();
  }, [refreshUser]);

  const login = async (email, password) => {
    const { user: loggedIn } = await authApi.login(email, password);
    if (!hasTokens()) {
      clearTokens();
      setUser(null);
      throw new Error('Sign-in succeeded but no session token was saved. Please try again.');
    }
    setUser(loggedIn);
    return loggedIn;
  };

  const register = async (payload) => {
    return authApi.register(payload);
  };

  const completeLogin = async (email, password) => {
    return login(email, password);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    window.location.href = '/login';
  };

  const sendOtp = (email) => authApi.sendOtp(email);
  const verifyOtp = (email, otp) => authApi.verifyOtp(email, otp);
  const forgotPassword = (email) => authApi.forgotPassword(email);
  const resetPassword = (token, new_password) => authApi.resetPassword(token, new_password);

  const isAuthenticated = !!user && hasTokens();

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, authChecked, isLoadingAuth,
      isLoadingPublicSettings: false, authError: null,
      login, register, completeLogin, logout, refreshUser,
      sendOtp, verifyOtp, forgotPassword, resetPassword,
      navigateToLogin: () => { window.location.href = '/login'; },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { getErrorMessage };
