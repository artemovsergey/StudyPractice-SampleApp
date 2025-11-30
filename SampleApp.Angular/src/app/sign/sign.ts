import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './sign.html',
  styleUrl: './sign.scss',
})
export class Sign {

  public model: any = {}
  public authService = inject(AuthService);
  public router = inject(Router);

  sign() {
    this.authService
      .register(this.model)
      .subscribe({ next: (r) => {console.log(r); this.router.navigate(['/auth']);}, error: (e) => console.log(e.error) });
  }
}
