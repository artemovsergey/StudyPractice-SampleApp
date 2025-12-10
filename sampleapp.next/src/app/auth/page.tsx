'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Аналог Router
import { useAuth } from '@/services/useAuth'; // Метод login из хука
import Link from 'next/link';

export default function AuthPage() {
  const [model, setModel] = useState({ login: '', password: '' });
  const router = useRouter();
  const { login } = useAuth(); // Метод login из хука

  const handleChange = (e: any) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(model); // Вызов метода login из сервиса
      router.push('/'); // Переход на главную страницу после успеха
    } catch (error) {
      console.error(error); // Обработка ошибки
    }
  };
  
  const isFormValid = model.login && model.password;

  return (
    // Стилизация: flex flex-1 justify-center items-center, gap-8
    <div className="auth flex flex-1 flex-col gap-8 justify-center items-center p-4">
      <h1 className="text-3xl font-bold">Авторизация</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        {/* Вместо mat-form-field/matInput используем стандартные input с Tailwind стилями */}
        <input 
          type="text" 
          name="login" 
          placeholder="Login" 
          value={model.login} 
          onChange={handleChange} 
          autoComplete="off"
          className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={model.password} 
          onChange={handleChange} 
          autoComplete="off"
          className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
        />

        {/* Вместо mat-flat-button используем стандартную кнопку с Tailwind */}
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="auth-button flex justify-center items-center space-x-2 p-3 rounded text-white font-semibold transition-colors
                     bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {/* Иконка LogIn */}
          Войти
        </button>
        
        <Link href="/sign" className="text-center text-sm text-indigo-600 hover:underline mt-2">
            Нет аккаунта? Зарегистрируйтесь
        </Link>
      </form>
    </div>
  );
}