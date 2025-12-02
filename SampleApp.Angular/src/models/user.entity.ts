export default interface User {
  id: number;
  name: string;
  login: string;
  password: string;
  token: string;
  bio?: string; // Добавил опциональное поле для биографии
  avatarUrl?: string; // Добавил для аватарки пользователя
}
