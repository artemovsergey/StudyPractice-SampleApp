import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import User from '../../models/user.entity';

@Component({
  selector: 'app-add-user-dialog',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.scss',
})
export class AddUserDialog {
  dialogRef = inject(MatDialogRef<AddUserDialog>);
  data = inject<any[]>(MAT_DIALOG_DATA);

  currentUser: User = {
    id: 0,
    login:'',
    password:'',
    name:'',
    token:'',
  };

  ok() {
    console.log('Передан: ', this.currentUser);
    this.dialogRef.close(this.currentUser);
  }

  cancell() {
    this.dialogRef.close();
  }
}
