import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar: MatSnackBar = inject(MatSnackBar);

  if (authService.currentUser() == null) {
    snackBar.open('Пользователь не авторизован', '', { duration: 3000 });
    router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};


