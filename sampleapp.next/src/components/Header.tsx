'use client';
import Link from 'next/link';
import { useAuth } from '@/services/useAuth';

// Замените MatIcon на иконки, например, из Heroicons или Lucide
import { Home, Users, LogIn, LogOut } from 'lucide-react'; 

export default function Header() {
  const { currentUser, logout } = useAuth(); // Получаем состояние авторизации

  return (
    // mat-toolbar color="primary" -> bg-indigo-600 p-4 flex justify-between
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Левая часть: Навигация для авторизованных пользователей */}
      <nav className="flex space-x-4">
        <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
          <Home size={20} /> Home
        </Link>
        
        {currentUser && (
          <Link href="/users" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
            <Users size={20} /> Пользователи
          </Link>
        )}
      </nav>

      {/* Правая часть: Кнопки Авторизация/Выход */}
      <div>
        {currentUser ? (
          <button
            onClick={() => logout()}
            className="flex items-center space-x-2 p-2 bg-red-500 hover:bg-red-600 rounded transition-colors"
          >
            <LogOut size={20} /> Выход
          </button>
        ) : (
          <Link href="/auth" className="flex items-center space-x-2 p-2 bg-green-500 hover:bg-green-600 rounded transition-colors">
            <LogIn size={20} /> Авторизация
          </Link>
        )}
      </div>
    </header>
  );
}