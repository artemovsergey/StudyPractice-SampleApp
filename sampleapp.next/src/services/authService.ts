import { User } from "../lib/models/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5083/api';

export const api = {

  login: async (data: { login: string; password: string }):Promise<User> => {
    return fetch(`${API_URL}/Users/Login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => {
            if (!res.ok) throw new Error('Неправильный логин или пароль');
            return res.json();
        });
  },

  register: async (data: { login: string; password: string }) => fetch(`${API_URL}/Users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error('Ошибка регистрации');
      return res.json();
    }),

  getUsers: async () => fetch(`${API_URL}/Users`).then(res => res.json()),
};