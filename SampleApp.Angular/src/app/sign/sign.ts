import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { loginForbiddenValidator } from '../../validators/loginForbiddenValidator';

@Component({
  selector: 'app-sign',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sign.html',
  styleUrl: './sign.scss',
})
export class Sign {
  public model: any = {};
  public authService = inject(AuthService);
  public router = inject(Router);
  public signForm: FormGroup;

  constructor() {
    this.signForm = new FormGroup(
      {
        login: new FormControl('', {validators: [Validators.required]}),
        password: new FormControl('', [Validators.maxLength(8)]),
      },
      { validators: [loginForbiddenValidator] }
    );
  }

  sign() {
    this.authService.register(this.signForm.value).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/auth']);
      },
      error: (e) => console.log(e.error),
    });
  }
}
