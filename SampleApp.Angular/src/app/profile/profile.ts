import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../models/post.entity';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  public profileUser = signal<User | null>(null);
  usersService = inject(UsersService);
  subscriptionsCount: number = 156;
  subscribersCount: number = 234;
  isSubscribed: boolean = false;

  posts: Post[] = [
    {
      id: 1,
      userId: 1,
      content: 'Сегодня начал изучение Angular Material. Очень удобная библиотека компонентов!',
      createdAt: new Date('2024-01-15T10:30:00'),
      likesCount: 24,
      commentsCount: 5,
      repostsCount: 8,
      isLiked: false,
      isReposted: false,
    },
    {
      id: 2,
      userId: 1,
      content: 'Завершил большой проект на React. Пора отдохнуть!',
      createdAt: new Date('2024-01-14T18:45:00'),
      likesCount: 42,
      commentsCount: 12,
      repostsCount: 15,
      isLiked: true,
      isReposted: true,
    },
  ];

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    console.log(id);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.get(Number(id)).subscribe({
      next: (r) => {
        console.log(r);
        this.profileUser.set(r);
      },
      error: (e) => console.log(e),
    });
  }

  toggleSubscription(): void {
    this.isSubscribed = !this.isSubscribed;

    if (this.isSubscribed) {
      this.subscribersCount++;
    } else {
      this.subscribersCount--;
    }
    // Здесь будет вызов API для обновления подписки
    // this.userService.subscribeToUser(this.user.id, this.isSubscribed).subscribe();
  }

   toggleLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likesCount += post.isLiked ? 1 : -1;
    
    // Здесь будет вызов API
    // this.postService.toggleLike(post.id).subscribe();
  }

  toggleRepost(post: Post): void {
    post.isReposted = !post.isReposted;
    post.repostsCount += post.isReposted ? 1 : -1;
    
    if (post.isReposted) {
      this.showRepostDialog(post);
    }
  }

  showRepostDialog(post: Post): void {
    // Можно реализовать диалоговое окно для добавления комментария к перепосту
    const comment = prompt('Добавьте комментарий к перепосту (необязательно):', '');
    
    if (comment !== null) {
      // Обработка комментария
      console.log('Комментарий к перепосту:', comment);
    }
  }

}
