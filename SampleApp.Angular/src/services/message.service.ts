import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public snackBar: MatSnackBar = inject(MatSnackBar);

  public message(text: string) {
    this.snackBar.open(text, '', { duration: 3000 });
  };
}
