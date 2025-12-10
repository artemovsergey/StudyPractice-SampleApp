'use client';
import { useAuth } from '@/services/useAuth';

export default function HomePage() {
  const { currentUser } = useAuth(); // Получаем текущего пользователя

  return (
    // Стилизация: flex flex-1 justify-center items-center, gap-4 m-4
    <div className="flex flex-1 flex-col gap-4 m-4 justify-center items-center">
      {currentUser ? (
        <h1 className="text-4xl font-extrabold">
          Добро пожаловать, **{currentUser.login}**
        </h1>
      ) : (
        <h1 className="text-4xl font-extrabold">
          Добро пожаловать
        </h1>
      )}
    </div>
  );
}