'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // Инициализация: Проверка localStorage при загрузке
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 1. Метод Login (аналог AuthService.login)
  const login = async (model) => {
    // В Next.js используем fetch API, не HttpClient
    const response = await fetch(`${API_URL}/Users/Login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.title || 'Ошибка авторизации');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // 2. Метод Logout (аналог AuthService.logout)
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    router.push('/auth'); // Переход на страницу авторизации после выхода
  };

  // 3. Метод Register (аналог AuthService.register)
  const register = async (model) => {
    const response = await fetch(`${API_URL}/Users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });

    if (!response.ok) {
        // ... (обработка ошибки)
        throw new Error('Ошибка регистрации');
    }
    return await response.json();
  };


  const value = { currentUser, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}