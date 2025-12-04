import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Token } from '../types/api'; // Assuming User and Token types are defined

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoggedIn: false,

      setToken: (token) => {
        set({ token, isLoggedIn: !!token });
      },
      setUser: (user) => {
        set({ user });
      },
      clearAuth: () => {
        set({ token: null, user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      getStorage: () => localStorage, // use localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // only persist token and user
    }
  )
);
