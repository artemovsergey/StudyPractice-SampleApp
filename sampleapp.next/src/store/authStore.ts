import { User } from '@/lib/models/user';
import { create } from 'zustand';


interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  
    user: null,

  login: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  loadUserFromStorage: () => {
    const stored = localStorage.getItem('user');
    if (stored) set({ user: JSON.parse(stored) });
  },
  
}));