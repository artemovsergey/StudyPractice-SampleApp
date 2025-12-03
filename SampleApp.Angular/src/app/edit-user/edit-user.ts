import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import User from '../../models/user.entity';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-edit-user',
  imports: [MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit {
  public editUser = signal<User>({
    id: 0,
    name: '',
    login: '',
    password: '',
    token: ''
  });
  public usersService = inject(UsersService)
  public messageService = inject(MessageService)

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    console.log(id);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.get(Number(id)).subscribe({
      next: (r) => {
        console.log(r);
        this.editUser.set(r);
      },
      error: (e) => console.log(e),
    });
  }

  edit() {
    this.usersService.update(this.editUser()).subscribe({
      next: (r) => this.messageService.message("Пользователь обновлен"),
      error: (e) => console.log(e)
    })
  }
}
