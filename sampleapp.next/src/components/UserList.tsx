// src/app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usersApi } from '@/services/userService';

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    usersApi.getAll().then(setUsers).catch(console.error);
  }, []);

  return (
    <div className="grid gap-4">
      {users.map(user => (
        <div key={user.id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">{user.login}</p>
        </div>
      ))}
    </div>
  );
}