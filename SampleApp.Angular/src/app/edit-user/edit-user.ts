import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import User from '../../models/user.entity';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageService } from '../../services/message.service';
import { loginForbiddenValidator } from '../../validators/loginForbiddenValidator';

@Component({
  selector: 'app-edit-user',
  imports: [
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit {
  public editUser = signal<User>({
    id: 0,
    name: '',
    login: '',
    avatar: '',
    token: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  public usersService = inject(UsersService);
  public messageService = inject(MessageService);
  public editForm: FormGroup;

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем id из URL
    console.log(id);

    this.editForm = new FormGroup(
      {
        name: new FormControl(this.editUser().name, { validators: [Validators.required] }),
        login: new FormControl(this.editUser().login, [Validators.required]),
      },
      { validators: [loginForbiddenValidator] }
    );
  }

  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.get(Number(id)).subscribe({
      next: (r) => {
        console.log(r);

        this.editUser.set(r);

        this.editForm.patchValue({
          name: r.name,
          login: r.login,
        });
        // или создать resolver, который для маршрута загрузит пользователя


      },
      error: (e) => console.log(e),
    });
  }

  edit() {
    console.log(this.editForm.value);
    this.editUser().login = this.editForm.value.login;
    this.editUser().name = this.editForm.value.name;

    this.usersService.update(this.editUser()).subscribe({
      next: (r) => this.messageService.message('Пользователь обновлен'),
      error: (e) => console.log(e),
    });
  }
}
