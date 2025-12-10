// src/app/users/page.tsx
import UserList from '@/components/UserList';

export default function UsersPage() {
  return (
    <div>
      <h1 className="users-page">Список пользователей</h1>
      <UserList />
    </div>
  );
}