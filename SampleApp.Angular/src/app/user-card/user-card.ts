import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  imports: [MatCardModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {}
