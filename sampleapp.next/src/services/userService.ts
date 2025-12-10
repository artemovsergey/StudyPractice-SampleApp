import {User} from '@/models/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const usersApi = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_URL}/Users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async get(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/Users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async create(user: User): Promise<User> {
    const response = await fetch(`${API_URL}/Users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async update(user: User): Promise<User> {
    const response = await fetch(`${API_URL}/Users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/Users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.ok;
  },
};