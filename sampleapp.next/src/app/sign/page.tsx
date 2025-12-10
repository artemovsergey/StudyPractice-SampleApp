'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/services/authService';
import Link from 'next/link';

export default function SignPage() {
  const [model, setModel] = useState({ login: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.register(model);
      login(user);
      router.push('/auth');
    } catch (err: any) {
      alert(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Login"
            value={model.login}
            onChange={e => setModel({ ...model, login: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={model.password}
            onChange={e => setModel({ ...model, password: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading || !model.login || !model.password}
            className="w-full bg-indigo-600 text-white py-2 rounded disabled:bg-gray-400 hover:bg-indigo-700"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Нет аккаунта? <Link href="/sign" className="text-indigo-600">Регистрация</Link>
        </p>
      </div>
    </div>
  );
}