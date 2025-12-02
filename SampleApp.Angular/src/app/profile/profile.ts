import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  
  public profileUser = signal<User | null>(null)
  usersService = inject(UsersService)

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    console.log(id);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.usersService.get(Number(id)).subscribe({
      next: (r) => {console.log(r); this.profileUser.set(r)},
      error: (e) => console.log(e)
    })
  }
}
