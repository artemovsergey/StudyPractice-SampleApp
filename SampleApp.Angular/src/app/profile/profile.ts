import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MicropostCard } from '../micropost-card/micropost-card';
import { UserCard } from "../user-card/user-card";
import { MicropostsService } from '../../services/microposts.service';
import { Micropost } from '../../models/micropost.entity';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MicropostCard, UserCard],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  public profileUser = signal<User | null>(null);
  usersService = inject(UsersService);
  micropostService = inject(MicropostsService)
  profileUserMessages = signal<Micropost[]>([])


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
        this.loadMicroposts()
      },
      error: (e) => console.log(e),
    });
  }

  loadMicroposts(){
    this.micropostService.getAllbyUser(this.profileUser()!.id).subscribe({
      next:(v) => this.profileUserMessages.set(v),
      error: (e) => console.log(e)
    })
  }

}
