// post.model.ts
export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  repostsCount: number; // Добавляем счетчик перепостов
  isReposted?: boolean; // Флаг, перепостил ли текущий пользователь
  isLiked?: boolean
}